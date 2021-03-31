var express = require("express");
var router = express.Router();

/* GET all clients summary */
router.get("/products", function (req, res, next) {

	result = [];

	var products = req.app.get("products");
    var purchases = req.app.get("purchases");

	for(var i = 0; i < products.length; i++)
    {
        var totalBuy = 0;
        var product = products[i];

        for(var j = 0; j < purchases.length; j++)
        {
            if (purchases[j].product == product.pk)
                totalBuy++;
        }

		result.push({
			id: product.pk,
			name: product.name,
			price: product.price + " €",
			count: totalBuy
		});
    }

    res.status(200);
	res.end(JSON.stringify(result));
});

module.exports = router;
