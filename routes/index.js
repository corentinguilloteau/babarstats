var express = require('express');
var router = express.Router();
const auth = require('../auth')
var path = require('path');

/* GET home page. */
router.get('*', auth.ensureAuth, function(req, res, next) {

    res.sendFile(path.join(__dirname + '/../public/index.html'));
  
});

module.exports = router;
