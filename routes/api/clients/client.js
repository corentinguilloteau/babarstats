var express = require("express");
var router = express.Router();
const global = require("../../../global");

/* GET client profil */
router.get("/:id/profil", function (req, res, next) {
	var customer = req.app.get("customers").find((c) => parseInt(c.pk) == parseInt(req.params.id));

    console.log(parseInt(req.params.id))
    console.log(customer)

	if (!customer) {
		res.status(404);
		res.end();

		return;
	}

	res.status(200);
	res.end(JSON.stringify(customer));
});

/* GET client amount of money spent */
router.get("/:id/spent", function (req, res, next) {
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

/* GET client promo ranking */
router.get("/:id/rank/promo", function (req, res, next) {
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
router.get("/:id/rank/total", function (req, res, next) {
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
