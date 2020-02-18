const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');


// THIS IS FOR LOGIN
require('./config/passport')(passport);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')(passport);



const app = express();


mongoose.connect('mongodb://localhost:27017/login');
const connection = mongoose.connection;
connection.on('error', error => {
    console.log(error);
});
connection.once('open', () => {
    console.log('connection is been made successfully');
});





// MIDDLEWARE
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// https://www.npmjs.com/package/express-session#reqsession
// https://www.npmjs.com/package/express-session#example
app.use(session({
    secret: 'thesecret',
    resave: false,
    saveUninitialized: true
}));

// THIS IS FOR LOGIN
app.use(passport.initialize());
app.use(passport.session());




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);


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