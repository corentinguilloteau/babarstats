var express = require("express");
var router = express.Router();
const global = require("../../../global");
const auth = require("../../../auth");

var clientRouter = require("./client");

router.use("/clients/", auth.ensureAuth, clientRouter);

/* GET all clients summary */
router.get("/clients", function (req, res, next) {

	var payments = req.app.get("payments");
    var customers = req.app.get("customers");

    res.status(200);
	res.end(JSON.stringify(global.getRanks(payments, customers)));
});

module.exports = router;
