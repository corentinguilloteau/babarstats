var express = require('express');
var router = express.Router();
var passport = require('passport');
const auth = require("../auth");
var path = require('path');

router.get('/login',
  function(req, res){
    res.sendFile(path.join(__dirname + '/../public/index.html'));
  });
  
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

router.post('/dummy', function (req, res, next) {
    if(req.user == "bar")
    {
        res.status(200);
        res.send("Logged in");
    }
    else
    {
        res.status(403);
        res.end();
    }
	
});

module.exports = router;