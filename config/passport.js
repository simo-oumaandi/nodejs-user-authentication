/*

//MY CODE
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');




//THIS WILL TELL THE PASSPORT HOW TO STORE USER IN THE SESSION
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});





// THIS WILL WORK AS CALL FUNCTION IN OUR ROUTE OF SIGNUP
// http://www.passportjs.org/packages/passport-local/
passport.use('local.signup', new LocalStrategy((req, email, password, done) => {
    console.log("working sing up starategy", req.body);

    // CHECK FOR USER IS ALREADY SAVED OR NOT
    User.findOne({ 'email': email },
        (err, user) => {
            if (err) {
                console.log("Error from finding db: ", err);
            }
            if (user) {
                return done(null, false, console.log("the email is already in the database"));
            }
        }
    );


    // IF THE USER WITH UNIQUE MAIL ADDRESS THEN SAVE THAT USER
    let newUser = new User()
    newUser.fname = req.body.fname;
    newUser.lname = req.body.lname;
    newUser.email = req.body.email;
    newUser.gender = req.body.gender;
    newUser.password = req.body.password;

    //SAVING USER TO DATABASE
    newUser.save((err, result) => {
        if (err) {
            return done(err);
        }
        return done(null, newUser);
    });





}));



*/









// ACADEMIND CODE

//SETUP PASSPORT AND STRATEGY
const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;









//THIS WILL TELL THE PASSPORT HOW TO STORE USER IN THE SESSION
passport.serializeUser((user, done) => {
    //STORE USER IN SESSION SERILIZE BY ID
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
});














//CREATE STRATEGY FOR SIGN UP
// https://stackoverflow.com/questions/32398120/passport-allow-sign-up-with-name-and-email-address-local-strategy
// https://github.com/MdSamsuzzohaShayon/nodejs-shoping-cart/blob/twelve/config/passport.js
passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    //THIS FUNCTION WILL USE IN THE ROUTE METHOD AS CALLBACK
    (req, email, password, done) => {
        /*
        // VLIDATING WITH EXPRESS VALIDATOR
        req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({
            min: 4
        });
        let errors = req.validationErrors();
        if (errors) {
            let messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }
        */
        User.findOne({
                'email': email
            },
            // CHECKING THE EMAIL IS ALREADY REGISTER OR NOT
            (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, {
                        message: "Email is already in use"
                    });
                }
                let newUser = new User();
                newUser.email = email;
                // ENCRYPT PASSWORD METHODS IS COMING FROM USER MODELS
                newUser.password = password

                //SAVING USER TO DATABASE
                newUser.save((err, result) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });

            }
        );
    }));