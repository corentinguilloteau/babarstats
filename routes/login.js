var express = require('express');
var router = express.Router();
const axios = require('axios');
var passport = require('passport');
const dataMan = require('../data')

router.get('/login',
  function(req, res){
    res.render('login');
  });
  
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

module.exports = router;