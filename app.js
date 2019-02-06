const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

//THIS TWO ARE FOR SHOWING ALERT MESSAGE
const flash = require('connect-flash');
const session = require('express-session');


const app = express();

// DB CONFIG
const db = require('./config/keys').mongoLocalURI;



// mongoose.connect(db, {
//         useNewUrlParser: true
//     })
//     .then(() => console.log("Mongo db is been connected"))
//     .catch(err => console.log("Error with mongodb " + err));



mongoose.connect(db); //IF TESTAROO DB IS ALREADY EXIST THEN OK. OR IF IT ISN'T IT WILL CREATE AUTOMATICLY
mongoose.connection.once('open', function () {
    console.log("Connection has been made now let's make fireaowks");
}).on('error', function (error) {
    console.log('Connection', error);
});



//EJS
app.use(expressLayouts); //WE NEED TO MAKE SURE THIS LAYOUT IS ABOVE VIEW ENGINE EJS SETTING
app.set('view engine', 'ejs');



//BODY PARSER
app.use(express.urlencoded({extended: false})); //now we can get data from form 


//EXPRESS SESSION
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


//CONNECT FLASH
app.use(flash());


//GLOBAL VARIABLES
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();

})



//ROUTES
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

app.use('/', indexRoutes);
app.use('/users', usersRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`app is running on http://localhost:${PORT}`));