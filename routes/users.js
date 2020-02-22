const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');







/* GET users listing. */
router.get('/signup', function(req, res, next) {
    res.render('users/signup');
});



// const { fname, lname, email, gender, password, password2 } = req.body;


//LOCAL.SHIGNUP THIS IS INDICATING THE STRATEGY WE MADE IN PASSPORT.JS FILE
// ERROR: WORK WITH CONNECT FLASH
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/users/signup'
        // failureFlash: true
}));



/*
//SIMPLE CODE FOR SAVING
router.post('/signup', (req, res, next) => {
    let newUser = new User({
        fname: req.body.fname,
        lname: req.body.fname,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password,
    });

    // console.log(req.body);

    newUser.save((err, docs) => {
        if (err) console.log(err);
        if (docs) console.log(docs);
        next(err);
    });
    res.redirect('/');

});

*/



router.get('/signin', (req, res, next) => {
    res.render('users/signin');
});

module.exports = router;