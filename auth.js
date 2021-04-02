module.exports = {
    ensureAuth: function(req, res, next)
    {
        if(process.env.ENV == "DEVNOAUTH")
            return next();

        if(req.user == "bar")
        {
            return next();
        }
        else
        {
            res.redirect('/login')
        }
    }
};