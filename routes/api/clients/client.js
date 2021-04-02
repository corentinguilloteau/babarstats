var express = require("express");
var router = express.Router();
const global = require("../../../global");
const auth = require("../../../auth");

/* GET client profil */
router.get("/:id/profil", auth.ensureAuth, function (req, res, next) {
	var customer = req.app.get("customers").find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!customer) {
		res.status(404);
		res.end();

		return;
	}

	res.status(200);
	res.end(JSON.stringify(customer));
});

/* GET client amount of money spent */
router.get("/:id/spent", auth.ensureAuth, function (req, res, next) {
	var customer = req.app.get("customers").find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!customer) {
		res.status(404);
		res.end();

		return;
	}

    var payments = req.app.get("payments");

	var customerTotalPayments = 0;

	for (var j = 0; j < payments.length; j++) {
		if (payments[j].customer == customer.pk)
			customerTotalPayments += payments[j].amount * 100;
	}

	res.status(200);
	res.end(
		(
			(customerTotalPayments - parseInt(customer.balance * 100)) /
			100
		).toFixed(2)
	);
});

/* GET client purchase history */
router.get("/:id/history", auth.ensureAuth, function (req, res, next) {
	var customer = req.app.get("customers").find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!customer) {
		res.status(404);
		res.end();

		return;
	}

    var purchases = req.app.get("purchases").filter(p => parseInt(p.customer) == parseInt(customer.pk));

    var formattedPurchases = purchases.map((p) =>
    {
        var timestamp = new Date(Date.parse(p.timestamp));
        
        var mm = timestamp.getMonth() + 1; // getMonth() is zero-based
        var dd = timestamp.getDate();
        var hh = timestamp.getHours();
        var MM = timestamp.getMinutes();

        var date = "Le " + (dd>9 ? '' : '0') + dd + "/" + (mm>9 ? '' : '0') + mm + "/" + timestamp.getFullYear() + " à " + (hh>9 ? '' : '0') + hh + "h" + (MM>9 ? '' : '0') + MM;

        var product = req.app.get("products").find(pr => parseInt(pr.pk) == parseInt(p.product));

        var newP = { product: {value: product.name, id: product.pk, href: "/products/"}, datetime: date };

        return newP;
    });

	res.status(200);
	res.end(JSON.stringify(formattedPurchases.reverse()));
});

/* GET client purchase history */
router.get("/:id/purchases", auth.ensureAuth, function (req, res, next) {
	var customer = req.app.get("customers").find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!customer) {
		res.status(404);
		res.end();

		return;
	}

    var purchases = req.app.get("purchases").filter(p => parseInt(p.customer) == parseInt(customer.pk) );

	res.status(200);
	res.end(JSON.stringify(purchases));
});

/* GET client top product */
router.get("/:id/top_products", auth.ensureAuth, function (req, res, next) {
	var customer = req.app.get("customers").find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!customer) {
		res.status(404);
		res.end();

		return;
	}

    var purchases = req.app.get("purchases").filter(p => parseInt(p.customer) == parseInt(customer.pk));

    var counts = purchases.reduce((p, c) => {
        var product = c.product;
        if (!p.hasOwnProperty(product)) {
          p[product] = 0;
        }
        p[product]++;
        return p;
      }, {});

      var countsExtended = Object.keys(counts).map(k => {
        return {product: k, count: counts[k]}; });

    var mappedCounts = countsExtended.map(c => {
        var product = req.app.get("products").find(pr => parseInt(pr.pk) == parseInt(c.product));

        return { product: {value: product.name, id: product.pk, href: "/products/"}, quantity: c.count };
    })

    mappedCounts = mappedCounts.sort(function(a, b){return b.quantity - a.quantity})

	res.status(200);
	res.end(JSON.stringify(mappedCounts));
});

/* GET client promo ranking */
router.get("/:id/rank/promo", auth.ensureAuth, function (req, res, next) {
    var customer = req.app.get("customers").find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!customer) {
		res.status(404);
		res.end();

		return;
	}

    var payments = req.app.get("payments");
    var customers = req.app.get("customers");

    var promoRanking = global.getRanks(payments, customers).filter(r => parseInt(r.year) == parseInt(customer.year));

	res.status(200);
	res.end((promoRanking.findIndex(u => parseInt(u.id) == parseInt(req.params.id)) + 1).toString());
});

/* GET client total ranking */
router.get("/:id/rank/total", auth.ensureAuth, function (req, res, next) {
    var customer = req.app.get("customers").find((c) => parseInt(c.pk) == parseInt(req.params.id));

	if (!customer) {
		res.status(404);
		res.end();

		return;
	}

    var payments = req.app.get("payments");
    var customers = req.app.get("customers");

    var ranking = global.getRanks(payments, customers);

	res.status(200);
	res.end((ranking.findIndex(u => parseInt(u.id) == parseInt(req.params.id)) + 1).toString());
});

module.exports = router;
