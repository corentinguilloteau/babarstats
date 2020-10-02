var express = require('express');
var router = express.Router();
const auth = require('../auth')

/* GET home page. */
router.get('/', auth.ensureAuth, function(req, res, next) {
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
