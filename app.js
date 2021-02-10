require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const secureRoute = require('./routes/secure');






require('./config/passport')(passport);
const app = express();

const morgan = require('morgan');












// 
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Mongodb is connected'));


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(morgan('dev'));




// COOKIE MIDDLEWARE 
app.use(cookieParser());


// // SESSION MIDDLEWARE 
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true }, // THIS WON'T WORK WITHOUT HTTPS
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));

// // PASSPORT MIDDLEWARE 
// app.use(passport.initialize());
// app.use(passport.session());


app.use((req, res, next)=>{
    if(req.isAuthenticated){
        console.log("Now we can set global variable");
        res.locals.user = req.user;
        next();
    }else{
        console.log("Now we can not set global variable");
        res.locals.user = null;
        next();
    }
});







app.use('/', indexRoute);
app.use('/auth', userRoute);

//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );




//Handle errors
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.json({ error : err });
//   });




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));