const express = require('express');
const router = express.Router();
const passport = require('passport');



const User = require('../models/User');








/* GET users listing. */
router.get('/signup', function(req, res, next) {
    // let messages = req.flash('error');
    res.render('users/signup', { messages });
});

router.get('/profile', (req, res, next) => {
    // res.render('users/profile', { messages });
    res.render('users/profile');
});

// const { fname, lname, email, gender, password, password2 } = req.body;


//LOCAL.SHIGNUP THIS IS INDICATING THE STRATEGY WE MADE IN PASSPORT.JS FILE

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
}));

/*
// ERROR: WORK WITH CONNECT FLASH
router.post('/signup', (req, res, next) => {
    const { fname, lname, email, gender, password, password2 } = req.body;
    console.log(`This is from signup post route. \n First name: ${fname}, Last name: ${lname}, email: ${email}, Gender: ${gender}, Password: ${password}, Password2: ${password2}`);



    // CHECKING USER ALREADY EXIST OR NOT
    User.findOne({ 'email': email }, (err, user) => {
        if (err) {
            // USE CONNECT FLASH
            console.log("There is an error from signup post route -> User.findOne \n");
            res.status(500).send('An error occer');
        } else {
            if (user) {
                // USE CONNECT FLASH
                console.log(' This user is already registred use another email -> from -> signup post route -> User.findOne \n');
                // res.status(500).send('This user is already registred use another email');
                let message = req.flash('error_msg', 'This user is already registred, use another email');
                res.render('users/signup', { message });
                // res.redirect('/users/signup');
            } else {
                const newUser = new User();
                newUser.fname = fname;
                newUser.lname = lname;
                newUser.email = email;
                newUser.gender = gender;
                // const hashedPassword = await bcrypt.hash(req.body.password, 10); 
                if (password == password2) {
                    newUser.password = password;
                } else {
                    console.log('\n \n The password did not match -> from ->user.js ->  signup post route -> User.findOne -> new User');
                    // res.status(404).send('The password did not match');
                    next(err);
                }
                newUser.save((err2, user) => {
                    if (err2) {
                        console.log('\n \n error ro save data: ', err2);
                        res.send('error ro save data: \n' + err2);
                        next(err2)
                    } else {
                        console.log('\n \n User details: \n', user);
                        res.status(201).send('User details: \n' + user)
                    }
                    console.log();

                });
            }
        }


    })
});

*/











router.get('/signin', (req, res, next) => {
    res.render('users/signin');
});

module.exports = router;