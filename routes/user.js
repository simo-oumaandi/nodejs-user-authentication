const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {ensureAuth, ensureGuest } = require('../middleware/auth');

const router = express.Router();



router.get('/register', ensureGuest, (req, res, next) => {
    res.render('register');
});



router.post('/register', async (req, res, next) => {
    // console.log(req.body);
    const { name, email, password, password2 } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.json({ "message": "user with this email is already exist" });
    }
    const newUser = await User.create({ name, email, password });
    // console.log(newUser);
    res.redirect('/auth/login');
    // res.status(200).json({ request: req.body });
});

















router.get('/login', ensureGuest, (req, res, next) => {
    res.render('login', {msg: null});
});




// SIGN THE TOKEN IN HERE ->
router.post('/login', async (req, res, next) => {
    // FETCHING USER WITH EMAIL AND PASSWORD
    const findUser = await User.findOne({email: req.body.email});
    if(!findUser) {
        return res.render('login', {msg: "There is no user with this email"});
    }


    // CHECK FOR PASSWORD DOES MATCH OR NOT 
    if(req.body.password !== findUser.password){
        return res.render('login', {msg: "Password didn't match"});
    }

    // console.log(findUser);
    // res.json(findUser);

    // CREATE A TOKEN WITH THAT EMAIL
    const maxAge = 3 * 24 * 60 * 60; // 3 days in mili seconds
    const token = await jwt.sign({id: findUser._id}, process.env.JWT_SECRET, {expiresIn: maxAge});
    console.log("Token: ",token);



    // SET TOKEN IN BROWSER COOKIE 
    // http://expressjs.com/en/5x/api.html#res.cookie
    res.cookie('jwt', token, {httpOnly: true, maxAge});


    // BY USING PASSPORT JWT WE ARE GOING TO VERIFY THEM 
    res.status(200).json({user: findUser._id});
});




// SIGN THE TOKEN IN HERE ->



// router.get('/profile', ensureAuth,
//     function(req, res) {
//         res.send(req.user);
//     }
// );
// router.get('/profile', passport.authenticate('jwt', { session: false }),
//     function(req, res) {
//         res.send(req.user);
//     }
// );













router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/auth');
});

module.exports = router;