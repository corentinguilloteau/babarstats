const { app } = require('electron');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.app.get("ready") == 0)
  {
    res.render('index');
  }
  else
  {
    res.render("still_loading")
  }
  
});

module.exports = router;
