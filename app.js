//https://www.youtube.com/watch?v=Q3_lOyBbpmE&t=240s
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session'); 
var passport = require("passport");
require('./passport')(passport);


mongoose.connect('mongodb://localhost:27017/login');

const db = mongoose.connection;
db.once('open', ()=> {
    console.log("Connection has been made now let's make fireaowks");
});
db.on('error', (error)=> {
    console.log('Connection', error);
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var auth = require('./routes/auth')(passport);

var app = express();











// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:'thesecret', saveUninitialized:false, resave:false}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', auth);

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



module.exports = app;
