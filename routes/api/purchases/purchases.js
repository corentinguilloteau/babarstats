var express = require("express");
var router = express.Router();
const global = require("../../../global");
var moment = require('moment');
const auth = require("../../../auth");

/* GET client purchase history */
router.get("/purchases", auth.ensureAuth, function (req, res, next) {

    var purchases = req.app.get("purchases").filter(p => parseInt(p.timestamp.slice(0, 4)) > 2003);

	res.status(200);
	res.end(JSON.stringify(purchases));
});

/* GET all clients summary */
router.get("/purchases/count/today", auth.ensureAuth, function (req, res, next) {

	var purchases = req.app.get("purchases");

    var now = moment().subtract(6, 'hours');

    purchases = purchases.filter((p) => {
        
        var date = moment(p.timestamp).subtract(6, 'hours');

        return (date.dayOfYear() == now.dayOfYear() && date.year() == now.year());
    });

    res.status(200);
	res.end(purchases.length.toString());
});

/* GET all clients summary */
router.get("/purchases/count/yesterday", auth.ensureAuth, function (req, res, next) {

	var purchases = req.app.get("purchases");

    var now = moment().subtract(6, 'hours').subtract(1, 'days');

    purchases = purchases.filter((p) => {
        
        var date = moment(p.timestamp).subtract(6, 'hours');

        return (date.dayOfYear() == now.dayOfYear() && date.year() == now.year());
    });

    res.status(200);
	res.end(purchases.length.toString());
});

/* GET all clients summary */
router.get("/purchases/money/today", auth.ensureAuth, function (req, res, next) {

	var purchases = req.app.get("purchases");

    var now = moment().subtract(6, 'hours');

    purchases = purchases.filter((p) => {
        
        var date = moment(p.timestamp).subtract(6, 'hours');

        return (date.dayOfYear() == now.dayOfYear() && date.year() == now.year());
    });

    purchasesPrice = purchases.map(p => {
        
        return parseInt(parseFloat(req.app.get("products").find(pr => parseInt(pr.pk) == parseInt(p.product)).price)*100);
    });

    res.status(200);
	res.end(((purchasesPrice.reduce((a, b) => a + b, 0.0))/100).toString());
});

router.get('/purchases/history', auth.ensureAuth, function (req, res, next) {
    var purchases = req.app.get("purchases");

    purchases = purchases.map(p => {
        var newP = {}

        newP.customer = req.app.get("customers").find(c => parseInt(p.customer) == parseInt(c.pk)).nickname;
        newP.product = req.app.get("products").find(c => parseInt(p.product) == parseInt(c.pk)).name;

        var timestamp = new Date(Date.parse(p.timestamp));
        
        var mm = timestamp.getMonth() + 1; // getMonth() is zero-based
        var dd = timestamp.getDate();
        var hh = timestamp.getHours();
        var MM = timestamp.getMinutes();

        var date = "Le " + (dd>9 ? '' : '0') + dd + "/" + (mm>9 ? '' : '0') + mm + "/" + timestamp.getFullYear() + " à " + (hh>9 ? '' : '0') + hh + "h" + (MM>9 ? '' : '0') + MM;

        newP.date = date;

        return newP;
    });

    res.status(200);
	res.end(JSON.stringify(purchases.reverse()));
})

module.exports = router;
