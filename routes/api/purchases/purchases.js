var express = require("express");
var router = express.Router();
const global = require("../../../global");
var moment = require("moment");
const auth = require("../../../auth");
const { Worker } = require("worker_threads");

/* GET client purchase history */
router.get("/purchases", auth.ensureAuth, function (req, res, next) {
	res.status(200);
	res.end(JSON.stringify(req.app.get("purchasesTimeserieCount")));
});

/* GET client purchase history in € */
router.get("/purchases_money", auth.ensureAuth, function (req, res, next) {
	res.status(200);
	res.end(JSON.stringify(req.app.get("purchasesTimeserieMoney")));
});

/* GET all clients summary */
router.get("/purchases/count/today", auth.ensureAuth, function (req, res, next) {
	var purchases = req.app.get("purchases");

	var today = moment(new Date(Date.now()))
		.subtract(6, "hours")
		.set("hours", 0)
		.set("minutes", 0)
		.set("seconds", 0)
		.set("milliseconds", 0)
		.add(6, "hours")
		.toDate();

	purchases = purchases.filter((p) => {
		var date = new Date(p.timestamp);

		return date - today > 0;
	});

	res.status(200);
	res.end(purchases.length.toString());
});

/* GET all clients summary */
router.get("/purchases/count/yesterday", auth.ensureAuth, function (req, res, next) {
	var purchases = req.app.get("purchases");

	var today = moment(new Date(Date.now()))
		.subtract(6, "hours")
		.subtract(1, "days")
		.set("hours", 0)
		.set("minutes", 0)
		.set("seconds", 0)
		.set("milliseconds", 0)
		.add(6, "hours")
		.toDate();

	purchases = purchases.filter((p) => {
		var date = new Date(p.timestamp);

		var diff = date - today;

		return diff > 0 && diff <= 24 * 60 * 60 * 1000;
	});

	res.status(200);
	res.end(purchases.length.toString());
});

/* GET all clients summary */
router.get("/purchases/count/week", auth.ensureAuth, function (req, res, next) {
	var purchases = req.app.get("purchases");

	var sevendays = moment(new Date(Date.now()))
		.subtract(6, "hours")
		.subtract(6, "days")
		.set("hours", 0)
		.set("minutes", 0)
		.set("seconds", 0)
		.set("milliseconds", 0)
		.add(6, "hours")
		.toDate();

	purchases = purchases.filter((p) => {
		var date = new Date(p.timestamp);

		var diff = date - sevendays;

		return diff > 0;
	});

	res.status(200);
	res.end(purchases.length.toString());
});

/* GET all clients summary */
router.get("/purchases/money/today", auth.ensureAuth, function (req, res, next) {
	var purchases = req.app.get("purchases");

	var today = moment(new Date(Date.now()))
		.subtract(6, "hours")
		.set("hours", 0)
		.set("minutes", 0)
		.set("seconds", 0)
		.set("milliseconds", 0)
		.add(6, "hours")
		.toDate();

	purchases = purchases.filter((p) => {
		var date = new Date(p.timestamp);

		return date - today > 0;
	});

	purchasesPrice = purchases.map((p) => {
		return parseInt(
			Math.round(req.app.get("products").find((pr) => parseInt(pr.pk) == parseInt(p.product)).price * 100)
		);
	});

	res.status(200);
	res.end((purchasesPrice.reduce((a, b) => a + b, 0) / 100).toString());
});

/* GET all clients summary */
router.get("/purchases/money/yesterday", auth.ensureAuth, function (req, res, next) {
	var purchases = req.app.get("purchases");

	var today = moment(new Date(Date.now()))
		.subtract(6, "hours")
		.subtract(1, "days")
		.set("hours", 0)
		.set("minutes", 0)
		.set("seconds", 0)
		.set("milliseconds", 0)
		.add(6, "hours")
		.toDate();

	purchases = purchases.filter((p) => {
		var date = new Date(p.timestamp);

		var diff = date - today;

		return diff > 0 && diff <= 24 * 60 * 60 * 1000;
	});

	purchasesPrice = purchases.map((p) => {
		return parseInt(
			Math.round(req.app.get("products").find((pr) => parseInt(pr.pk) == parseInt(p.product)).price * 100)
		);
	});

	res.status(200);
	res.end((purchasesPrice.reduce((a, b) => a + b, 0) / 100).toString());
});

/* GET all clients summary */
router.get("/purchases/money/week", auth.ensureAuth, function (req, res, next) {
	var purchases = req.app.get("purchases");

	var sevendays = moment(new Date(Date.now()))
		.subtract(6, "hours")
		.subtract(6, "days")
		.set("hours", 0)
		.set("minutes", 0)
		.set("seconds", 0)
		.set("milliseconds", 0)
		.add(6, "hours")
		.toDate();

	purchases = purchases.filter((p) => {
		var date = new Date(p.timestamp);

		var diff = date - sevendays;

		return diff > 0;
	});

	purchasesPrice = purchases.map((p) => {
		return parseInt(
			Math.round(req.app.get("products").find((pr) => parseInt(pr.pk) == parseInt(p.product)).price * 100)
		);
	});

	res.status(200);
	res.end((purchasesPrice.reduce((a, b) => a + b, 0) / 100).toString());
});

router.get("/purchases/history", auth.ensureAuth, function (req, res, next) {
	res.status(200);
	res.end(JSON.stringify(req.app.get("purchasesHistory")));
});

module.exports = router;
