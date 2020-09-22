var express = require('express');
var router = express.Router();
const axios = require('axios');
const dataMan = require('../data')

/* GET customers */
router.get('/customers', function(req, res, next) {
  res.status(200);
  res.end(JSON.stringify(req.app.get("customers")));
});

/* GET customer data */
router.get('/customer/:id', function(req, res, next) {
    result = [];

    for(item of req.app.get("customers"))
    {
        if(item.pk == req.params.id)
        {
            result.push(item);
        }
    };

    res.status(200);
    res.end(JSON.stringify(result));
});

/* GET purchase data */
router.get('/purchase/:id', function(req, res, next) {
    result = [];

    for(item of req.app.get("purchases"))
    {
        if(item.customer == req.params.id)
        {
            result.push(item);
        }
    };

    res.status(200);
    res.end(JSON.stringify(result));
});

/* GET payment data */
router.get('/payment/:id', function(req, res, next) {
    result = [];

    for(item of req.app.get("payments"))
    {
        if(item.customer == req.params.id)
        {
            result.push(item);
        }
    };

    res.status(200);
    res.end(JSON.stringify(result));
});

/* GET payments */
router.get('/payments', function(req, res, next) {
    res.status(200);
    res.end(JSON.stringify(req.app.get("payments")));
});

/* GET refresh data */
router.get('/refresh', function(req, res, next) {
    dataMan.loadData(req.app)
    .then(() => {
        res.status(200);
        res.end("");
    });    
});

module.exports = router;