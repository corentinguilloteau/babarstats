var express = require("express");
var router = express.Router();
const auth = require("../../../auth");

/* GET product data */
router.get("/:id/data", auth.ensureAuth, function (req, res, next) {
	var product = req.app
		.get("products")
		.find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!product) {
		res.status(404);
		res.end();

		return;
	}

	res.status(200);
	res.end(JSON.stringify(product));
});

/* GET product price */
router.get("/:id/price", auth.ensureAuth, function (req, res, next) {
	var product = req.app
		.get("products")
		.find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!product) {
		res.status(404);
		res.end();

		return;
	}

	res.status(200);
	res.end(product.price.toString());
});

/* GET quantity of product sold */
router.get("/:id/quantity_sold", auth.ensureAuth, function (req, res, next) {
	var product = req.app
		.get("products")
		.find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!product) {
		res.status(404);
		res.end();

		return;
	}

	var purchaseCount = req.app
		.get("purchases")
		.filter((p) => parseInt(p.product) == parseInt(product.pk));

	res.status(200);
	res.end(purchaseCount.length.toString());
});

/* GET product purchase history */
router.get("/:id/purchases", auth.ensureAuth, function (req, res, next) {
	var product = req.app
		.get("products")
		.find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!product) {
		res.status(404);
		res.end();

		return;
	}

	var purchases = req.app
		.get("purchases")
		.filter(
			(p) =>
				parseInt(p.product) == parseInt(product.pk) &&
				parseInt(p.timestamp.slice(0, 4)) > 2003
		);

	res.status(200);
	res.end(JSON.stringify(purchases));
});

/* GET product purchase history */
router.get("/:id/history", auth.ensureAuth, function (req, res, next) {
	var product = req.app
		.get("products")
		.find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!product) {
		res.status(404);
		res.end();

		return;
	}

	var purchases = req.app
		.get("purchases")
		.filter((p) => parseInt(p.product) == parseInt(product.pk));

	var formattedPurchases = purchases.map((p) => {
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

		var customer = req.app
			.get("customers")
			.find((pr) => parseInt(pr.pk) == parseInt(p.customer));

		var newP = { customer: {value: customer.nickname, id: customer.pk, href: "/customers/"}, datetime: date };

		return newP;
	});

	res.status(200);
	res.end(JSON.stringify(formattedPurchases.reverse()));
});

/* GET product top product */
router.get("/:id/top_customers", auth.ensureAuth, function (req, res, next) {
	var product = req.app
		.get("products")
		.find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!product) {
		res.status(404);
		res.end();

		return;
	}

	var purchases = req.app
		.get("purchases")
		.filter((p) => parseInt(p.product) == parseInt(product.pk));

	var counts = purchases.reduce((p, c) => {
		var customer = c.customer;
		if (!p.hasOwnProperty(customer)) {
			p[customer] = 0;
		}
		p[customer]++;
		return p;
	}, {});

	var countsExtended = Object.keys(counts).map((k) => {
		return { customer: k, count: counts[k] };
	});

	var mappedCounts = countsExtended.map((c) => {
		var customer = req.app
			.get("customers")
			.find((pr) => parseInt(pr.pk) == parseInt(c.customer));

		return { customer: {value: customer.nickname, id: customer.pk, href: "/customers/"}, quantity: c.count };
	});

	mappedCounts = mappedCounts.sort(function (a, b) {
		return b.quantity - a.quantity;
	});

	res.status(200);
	res.end(JSON.stringify(mappedCounts));
});

module.exports = router;
