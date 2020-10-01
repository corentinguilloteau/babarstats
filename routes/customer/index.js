var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  if(req.app.get("ready") == 0)
  {

    var user

    for(u of req.app.get("customers"))
    {
        if(u.pk == req.params.id)
        {
            user = u
        }
    }

    console.log(u)

    if(!user)
    {
        res.render('error', {message: user, error: {status: 500, stack: ""}});
    }
    else
    {
        res.render('customer/index',
        {
            name: user.firstname,
            surname: user.lastname 
        });
    }
   
  }
  else
  {
    res.render("still_loading")
  }
  
});

module.exports = router;
