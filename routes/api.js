var express = require("express");
var router = express.Router();
const axios = require("axios");
const dataMan = require("../data");
const auth = require("../auth");

/* GET customers */
router.get("/clients", function (req, res, next) {

	result = [];

	var payments = req.app.get("payments");
    var customers = req.app.get("customers");

	for(var i = 0; i < customers.length; i++)
    {
        var customerTotalPayments = 0;
        var customer = customers[i];

        if(parseInt(customer.year) < 2021)
            continue;

        for(var j = 0; j < payments.length; j++)
        {
            if (payments[j].customer == customer.pk)
				customerTotalPayments += payments[j].amount * 100;
        }

		result.push({
			id: customer.pk,
			surname: customer.nickname,
			spent:
				((customerTotalPayments - parseInt(customer.balance * 100)) /
				100).toFixed(2),
			year: customer.year,
			status: customer.status.name
		});
    }

    res.status(200);
	res.end(JSON.stringify(result));
});

router.get;

/* GET customer data */
router.get("/customer/:id", auth.ensureAuth, function (req, res, next) {
	result = [];

	for (item of req.app.get("customers")) {
		if (item.pk == req.params.id) {
			result.push(item);
		}
	}

	res.status(200);
	res.end(JSON.stringify(result));
});

/* GET purchase data */
router.get("/purchase/:id", auth.ensureAuth, function (req, res, next) {
	result = [];

	for (item of req.app.get("purchases")) {
		if (item.customer == req.params.id) {
			result.push(item);
		}
	}

	res.status(200);
	res.end(JSON.stringify(result));
});

/* GET payment data */
router.get("/payment/:id", auth.ensureAuth, function (req, res, next) {
	result = [];

	for (item of req.app.get("payments")) {
		if (item.customer == req.params.id) {
			result.push(item);
		}
	}

	res.status(200);
	res.end(JSON.stringify(result));
});

/* GET payments */
router.get("/payments", auth.ensureAuth, function (req, res, next) {
	res.status(200);
	res.end(JSON.stringify(req.app.get("payments")));
});

/* GET refresh data */
router.get("/refresh", auth.ensureAuth, function (req, res, next) {
	dataMan.loadData(req.app).then(() => {
		res.status(200);
		res.end("");
	});
});

module.exports = router;
