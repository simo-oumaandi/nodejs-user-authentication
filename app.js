const createError = require('http-errors');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
// const 


const keys = require('./config/keys');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();






// DATABASE SETUP
// https://mongoosejs.com/docs/connections.html
mongoose.connect(keys.MongoURI, (err) => {
    console.log("Error: " + err);
});
const db = mongoose.connection;
db.once('error', (err) => {
    console.log("Error Event : " + err);
});
db.on('open', () => {
    console.log("MongoDB Connected successfully");
});


// PASSPORT SIGN UP AND SIGN IN STRATEGY 
// http://www.passportjs.org/docs/authenticate/
require('./config/passport');


// MIDDLEWARE
// view engine setup
// https://www.npmjs.com/package/express-handlebars
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


// BODY PARSER
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
// app.use(express.session({ cookie: { maxAge: 60000 } }));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());

// ROUTING
app.use('/', indexRouter);
app.use('/users', usersRouter);






// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



// app.listen(3000);
module.exports = app;