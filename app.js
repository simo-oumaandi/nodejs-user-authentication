// https://www.youtube.com/watch?v=hb26tQPmPl4&list=PLjrjtggw2EDxwzgTWdfxwbEKW_Cu43srx&index=3
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
let ExpressValidator = require('express-validator');
let multer = require('multer');
let upload = multer({dest: './uploads'});
let app = express();
let flash = require('connect-flash');
let bcrypt = require('bcryptjs');
let mongo = require('mongodb');
let mongoose = require('mongoose');


let db = mongoose.connection;


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



//HANDLE FILE UPLOAD
/*app.use(multer({
  dest: '/uploads'
}));*/




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//MIDDLEWARE FOR SESSION, HANDLE SESSION
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));




//MIDDLEWARE FOR PASSPORT. FOR AUTHENTICATION SYSTEM
app.use(passport.initialize());
app.use(passport.session());


//MIDDLEWARE FOR VALIDATE
app.use(ExpressValidator({
  errorFormatter: function (param, msg, value) {
    let namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

      while(namespace.length){
        formParam += '[' + namespace.shift() + ']'
      }
      return {
        param : formParam,
        msg : msg,
        value : value
      };
  }
}));


app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});






app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;