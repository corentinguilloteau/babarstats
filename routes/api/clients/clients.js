var express = require("express");
var router = express.Router();

/* GET all clients summary */
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

module.exports = router;
