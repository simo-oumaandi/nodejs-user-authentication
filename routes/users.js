// LOGIN REGISTER ROUTES ARE HERE

const express = require('express');
const router = express.Router();
//ENCRYPTING PASSWORD
const bcrypt = require('bcryptjs');


//USER MODELS
const User = require('../models/Users');


// LOGIN SYSTEM
router.get('/login', (req, res) => {
    res.render("login");
});


// REGISTER SYSTEM
router.get('/register', (req, res) => {
    res.render("register");
});



// REGISTER HANDLE
router.post('/register', (req, res) => {
    //DESTRUCTURING ALL PROPERTY FROM REQ.BODY
    const {
        name,
        email,
        password,
        password2
    } = req.body;

    let errors = [];

    //CHECK REQUIRED FIELDS
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: "Please fill all fields"
        });
    }

    //CHECK PASSWORD MATCH
    if (password != password2) {
        errors.push({
            msg: "password didn't match"
        });
    }

    //CHECK PASSWORD LENGTH
    if (password.length < 6) {
        errors.push({
            msg: "password must be atleast 6 charecter"
        });
    }


    //IF THERE IS NO ERROR IT WILL RENDER
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // res.send('pass');
        // validation passed
        User.findOne({
                email
            })
            .then(user => {
                if (user) {
                    //USER EXIST
                    errors.push({
                        msg: 'Email is already register'
                    });
                    res.render('register', {
                        errors, // SAME AS( ERRORS:ERRORS)
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    //CREATING NEW USER 
                    const newUser = new User({
                        name, ///ACTUALLY WE ARE SETTING LIKE NAME:REQ.BODY.NAME
                        email,
                        password
                    });
                    // console.log(newUser);
                    // res.send("hello");

                    //HASH PASSWORD
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //SET PASSWORD TO HASH
                            newUser.password = hash;
                            //SAVE USER
                            newUser.save()
                                .then(user => {
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err))
                        });
                    });
                }
            });

    }


});


module.exports = router;