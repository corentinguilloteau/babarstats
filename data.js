const axios = require("axios");
const global = require("./global");

var timeout = null;

function processData(data) {
	res = [];

	for (var i = 0; i < data.length; i++) {
		res[parseInt(data[i].pk)] = data[i];
	}

	return res;
}

async function fetchData(app) {
	var payments;
	var customers;
	var status;
	var products;
	var purchases;

	try {
		const { data } = await axios.get("https://babar.rezel.net/api/payment/?format=json");
		payments = data;
	} catch (error) {
		app.set("ready", 2);
		console.log(error);

		return null;
	}

	try {
		const { data } = await axios.get("https://babar.rezel.net/api/customer/?format=json");
		customers = data;
	} catch (error) {
		app.set("ready", 2);
		console.log(error);

		return null;
	}

	try {
		const { data } = await axios.get("https://babar.rezel.net/api/status/?format=json");
		status = data;
	} catch (error) {
		app.set("ready", 2);
		console.log(error);

		return null;
	}

	try {
		const { data } = await axios.get("https://babar.rezel.net/api/product/?format=json");
		products = data;
	} catch (error) {
		app.set("ready", 2);
		console.log(error);

		return null;
	}

	try {
		const { data } = await axios.get("https://babar.rezel.net/api/purchase/?format=json");
		purchases = data;
	} catch (error) {
		app.set("ready", 2);
		console.log(error);

		return null;
	}

	return { payments, customers, status, products, purchases };
}

function computeGlobalData(payments, customers, status, products, purchases) {
	var purchasesHistory = purchases
		.map((p) => {
			var newP = {};

			customer = processData(customers)[parseInt(p.customer)];
			product = processData(products)[parseInt(p.product)];

			newP.customer = { value: customer.nickname, id: customer.pk, href: "/clients/" };
			newP.product = { value: product.name, id: product.pk, href: "/products/" };

			var timestamp = new Date(Date.parse(p.timestamp));

			var mm = timestamp.getMonth() + 1; // getMonth() is zero-based
			var dd = timestamp.getDate();
			var hh = timestamp.getHours();
			var MM = timestamp.getMinutes();

			var date =
				"Le " +
				(dd > 9 ? "" : "0") +
				dd +
				"/" +
				(mm > 9 ? "" : "0") +
				mm +
				"/" +
				timestamp.getFullYear() +
				" à " +
				(hh > 9 ? "" : "0") +
				hh +
				"h" +
				(MM > 9 ? "" : "0") +
				MM;

			newP.date = date;

			return newP;
		})
		.reverse();

	var productsDisplay = products.map((p) => {
		var totalBuy = 0;

		for (var j = 0; j < purchases.length; j++) {
			if (purchases[j].product == p.pk) totalBuy++;
		}

		return {
			id: p.pk,
			name: p.name,
			price: parseFloat(p.price),
			count: totalBuy,
		};
	});

	var purchasesTimeserieCount = purchases
		.filter((p) => parseInt(p.timestamp.slice(0, 4)) > 2003)
		.map((p) => {
			return { timestamp: p.timestamp, value: 1 };
		});

	var purchasesTimeserieMoney = purchases
		.filter((p) => parseInt(p.timestamp.slice(0, 4)) > 2003)
		.map((p) => {
			var product = products.find((pr) => parseInt(pr.pk) == parseInt(p.product));

			var newP = { timestamp: p.timestamp, value: product.price };

			return newP;
		});

	return { purchasesHistory, productsDisplay, purchasesTimeserieCount, purchasesTimeserieMoney };
}

async function loadData(app, nonotify) {
	if (timeout !== null) {
		clearTimeout(timeout);
	}

	if (nonotify) app.set("ready", 1);

	console.log("Updating data...");

	const res = await fetchData(app);

	if (res == null) {
		// On case fetch failed, we retry in 2 min
		console.log("Fetch failed, retrying in 2 minutes...");
		timeout = setTimeout(loadData, 1000 * 60 * 2, app, false);

		if (nonotify) app.set("ready", 0);

		return;
	}

	console.log("Data is fetched, processing it");

	const { payments, customers, status, products, purchases } = res;

	const { purchasesHistory, productsDisplay, purchasesTimeserieCount, purchasesTimeserieMoney } = computeGlobalData(
		payments,
		customers,
		status,
		products,
		purchases
	);

	app.set("payments", payments);
	app.set("customers", customers);
	app.set("status", status);
	app.set("products", products);
	app.set("purchases", purchases);

	app.set("purchasesHistory", purchasesHistory);
	app.set("productsDisplay", productsDisplay);
	app.set("purchasesTimeserieCount", purchasesTimeserieCount);
	app.set("purchasesTimeserieMoney", purchasesTimeserieMoney);

	app.set("ready", 0);
	var date = new Date();
	app.set("latest_update", global.formatDate(date));
	console.log("Data is ready !");

	timeout = setTimeout(loadData, 1000 * 60 * 60, app, false);
}

module.exports = {
	loadData,
};
