const express = require('express');
const router = express.Router();
const passport = require('passport');







/* GET users listing. */
router.get('/signup', function(req, res, next) {
    res.render('users/signup');
});



// const { fname, lname, email, gender, password, password2 } = req.body;


//LOCAL.SHIGNUP THIS IS INDICATING THE STRATEGY WE MADE IN PASSPORT.JS FILE
// ERROR: WORK WITH CONNECT FLASH
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/users/signup',
    failureFlash: true
}));


router.get('/signin', (req, res, next) => {
    res.render('users/signin');
});

module.exports = router;