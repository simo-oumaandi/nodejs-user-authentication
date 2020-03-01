const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const validator = require('express-validator');
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
db.on('error', (err) => {
    console.log("Error Event : " + err);
});
db.once('open', () => {
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


// GIVEN BY EXPRESS GENERATOR
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// SETUP STATIC FOLDER -> GIVEN BY EXPRESS GENERATOR
app.use(express.static(path.join(__dirname, 'public')));


// Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



// https://www.npmjs.com/package/connect-flash
// The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. 
app.use(flash());


// https://www.npmjs.com/package/express-session
// app.use(express.session({ cookie: { maxAge: 60000 } }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));






// http://www.passportjs.org/docs/configure/
app.use(passport.initialize());
app.use(passport.session());




// CONFIGURING GLOBAL VARIABLES
// app.use((req, res, next)=>{
//     res.locals.success_msg = req.flash()
// })
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });








//DEFAULT EXPRESS MIDDLEWARE SETUP
app.use((req, res, next) => {
    // GLOBAL PROPERTIES OR VIEWS THAT WILL BE AVAILABLE IN VIEWS
    res.locals.login = req.isAuthenticated();
    //BY USING THIS I CAN ACCESS SESSION IN ALL MY VIEWS
    res.locals.session = req.session;
    next(); //let the request continue
});



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