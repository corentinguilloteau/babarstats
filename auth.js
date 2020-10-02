module.exports = {
    ensureAuth: function(req, res, next)
    {
        if(req.user == "bar")
        {
            return next();
        }
        else
        {
            res.redirect('/login');
        }
    }
};