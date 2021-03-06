var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require ('bcrypt');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var customerRouter = require('./routes/customer/index');
var loginRouter = require('./routes/login');
var dataMan = require('./data');
var cors = require('cors');

var ipfilter = require('express-ipfilter').IpFilter;
var IpDeniedError = require('express-ipfilter').IpDeniedError;

var app = express();

if(process.env.ENV == "DEV" || process.env.ENV == "DEVNOAUTH")
    app.use(cors());

function hash(password)
{
  return bcrypt.hashSync(password, 10);
}

pass = (process.env.ENV == "PROD") ? "$2b$10$Pzk52NHvGeQ.4FMHVXICwOPLkiGCLk7adMS..er5D474foaXNsSwa" : hash("test");

passport.use(new Strategy(
  function(username, password, cb) {
      if(process.env.ENV == "DEVNOAUTH") { return cb(null, "bar"); }
      if (!bcrypt.compareSync(password, pass) || username != "bar") { return cb(null, false); }
      return cb(null, "bar");
    })
);

passport.serializeUser(function(user, cb) {
  cb(null, "bar");
});

passport.deserializeUser(function(id, cb) {
  cb(null, "bar");
});

app.use(require('express-session')({ secret: 'kznekpncaenkcprniacnpq', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let clientIp = function(req, res) {
  console.log(req.headers);
  return req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : "";
};

const ips = ['137.194.0.1/16', '2a04:8ec0::/32'];

app.use(ipfilter({ id: clientIp, 
  forbidden: 'You are not authorized to access this page.',
  strict: false,
  filter: ips,
  mode: 'allow'
}));

app.use('/', loginRouter);
app.use('/api/', apiRouter);
app.use('/', indexRouter);

dataMan.loadData(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  console.log(req.headers);
  console.log(err);

  if (err instanceof IpDeniedError) {
    res.status(403);
    //res.send('Access forbidden');
    //res.end();
    res.render('error');

    

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'DEV' ? err : {};
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'DEV' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

app.listen(80, "0.0.0.0", () => {
  console.log(`BabarStats started at http://localhost`);
});

module.exports = app;
