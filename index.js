if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./passport');

const app = express();


initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id),
)

const users = [];


// MIDDLEWARE
app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: false })); // THIS WILL ABLE TO ACCESS THE FORM INSIDE REQUEST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // IF NOTHING CHANGE SHOULD RESAVE ?
    saveUninitialized: false // NO EMPTY VALUE IN SESSION
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));



// ROUTES
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index', { name: req.user.name });
});



app.get('/login', checkNotAuthenticated, (req, res, next) => {
    res.render('login');
});
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res, next) => {
    res.render('register');
});
app.post('/register', checkNotAuthenticated, async(req, res, next) => {
    // console.log(req.body.name);

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(Date.now().toString());
        // console.log(req.body.name);
        // console.log(req.body.email);
        // console.log(hashedPassword);




        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
    // res.json(users);
    console.log(users);

});



// LOG OUT
app.delete('/logout', (req, res, next) => {
    req.logOut(); // FROM PASSPORT
    res.redirect('/login');
})



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}





app.listen(3000, () => {
    console.log('server is running on port 3000');
})