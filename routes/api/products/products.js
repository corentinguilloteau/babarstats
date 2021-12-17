var express = require("express");
var router = express.Router();
const auth = require("../../../auth");

var productRouter = require("./product");

router.use("/products/", auth.ensureAuth, productRouter);

/* GET all clients summary */
router.get("/products", function (req, res, next) {
	res.status(200);
	res.end(JSON.stringify(req.app.get("productsDisplay")));
});

module.exports = router;
