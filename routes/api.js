var express = require("express");
var router = express.Router();
const dataMan = require("../data");
const auth = require("../auth");

var clientsRouter = require("./api/clients/clients");
var productsRouter = require("./api/products/products");
var purchasesRouter = require("./api/purchases/purchases");

router.use("/", clientsRouter);
router.use("/", productsRouter);
router.use("/", purchasesRouter);

/* GET latest refresh */
router.get("/update", auth.ensureAuth, function (req, res, next) {
	res.status(200);
    res.send(req.app.get("latest_update").toString());
});

/* GET data status */
router.get("/status", auth.ensureAuth, function (req, res, next) {
	res.status(200);
    res.send(req.app.get("ready").toString());
});

/* POST refresh data */
router.post("/update", auth.ensureAuth, function (req, res, next) {
	dataMan.loadData(req.app);

    res.status(200);
	res.end("");
});

//, auth.ensureAuth

module.exports = router;
