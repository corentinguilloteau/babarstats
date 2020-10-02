var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var customerRouter = require('./routes/customer/index');
var loginRouter = require('./routes/login');
var dataMan = require('./data');

var app = express();

passport.use(new Strategy(
  function(username, password, cb) {
      if ("test" != password || username != "bar") { return cb(null, false); }
      return cb(null, "bar");
    })
);

passport.serializeUser(function(user, cb) {
  cb(null, "bar");
});

passport.deserializeUser(function(id, cb) {
  cb(null, "bar")
});

app.use(require('express-session')({ secret: 'kznekpncaenkcprniacnpq', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/api/', apiRouter);
app.use('/customer/', customerRouter);

dataMan.loadData(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(80, "0.0.0.0", () => {
  console.log(`BabarStats started at http://localhost`)
})

module.exports = app;
