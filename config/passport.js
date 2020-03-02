//SETUP PASSPORT AND STRATEGY
const passport = require('passport');
const { check, validationResult } = require('express-validator');
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

        // CHECK FOR EMAIL ADDRESS
        check(email, 'Invalid Email').notEmpty().isEmail();
        check(password, 'Invalid Password').notEmpty().isLength({ min: 5 });
        let errors = validationResult(req);




        // STORING ALL ERRORS IN A ARRAY
        // AND RETURN ALL ERROR
        if (errors) {
            console.log(errors);
            console.log('There are some error with email and password from ->  passport.js -> signup strategy');

            // let messages = [];
            // errors.forEach(error => {
            //     messages.push(error);
            // });
            // // return done(null, false, req.flash('error', messages));
            return done(null, false, { message: "There are some error with email and password" });

        } else {


            // CHECKING IF THERE IS THE USER WITH THE MAIL IS ALREADY EXIST OR NOT
            // IF EXIST WE WILL RETURN WITH ERROR
            // IF DOES NOT EXIST WE WILL CREATE A NEW USER
            User.findOne({
                    'email': email
                },
                // CHECKING THE EMAIL IS ALREADY REGISTER OR NOT
                (err, user) => {
                    if (err) {
                        console.log("from passport.js -> sign up starategy Error: " + err);
                        return done(err);
                    }
                    if (user) {
                        console.log('Email is already in use -> from passport.js -> sign up starategy');
                        return done(null, false, {
                            message: "Email is already in use"
                        });
                    }
                    let newUser = new User();
                    newUser.fname = req.body.fname;
                    newUser.lname = req.body.lname;
                    newUser.email = email;
                    // ENCRYPT PASSWORD METHODS IS COMING FROM USER MODELS
                    newUser.gender = req.body.gender;
                    newUser.password = newUser.hashPassword(password);


                    // FLASH MESSAGE: 
                    // https://github.com/jaredhanson/connect-flash
                    // req.flash('msg', 'adding user');

                    if (req.body.password == req.body.password2) {
                        //SAVING USER TO DATABASE
                        newUser.save((err, result) => {
                            if (err) {
                                return done(err);
                            }
                            return done(null, newUser, { message: "The record is been saved" });
                            // return done(null, newUser, req.flash('msg', 'added user'));
                        });
                    } else {
                        console.log("password didn't match");
                    }
                }
            );
        }





    }));

































// SING IN STARATEGY
// http://www.passportjs.org/docs/configure/
passport.use('local.signin', new LocalStrategy(
    (req, email, password, done) => {
        check(email, 'Incorrect Email').notEmpty().isEmail();
        check(password, 'Incorrect password').notEmpty();
        let errors = validationResult(req);
        if (errors) {
            console.log("There are some error with email and password from ->  passport.js -> signin strategy");
            console.log(errors);
            done(null, false, { message: "There are some error with email and password to login" })
        } else {
            /*User.findOne({ email }, (err, user) => {
                if (err) { return done(err); }
                if (!user) {
                    console.log("There is no user with that mail or password from ->  passport.js -> signin strategy");
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPasswod(password)) {
                    console.log("Your password is wrong from ->  passport.js -> signin strategy");
                    return done(null, false, { message: "Wrong password" })
                }
                User.comparePassword()
                return done(null, user);
            });*/

            User.findOne({ email }).then(user => {
                if (!user) {
                    console.log("There is no user with that mail or password from ->  passport.js -> signin strategy");
                    return done(null, false, { message: 'Incorrect username.' });
                }
                User.comparePassword(password, user.password);
            }).catch(err => {
                console.log(err);
            })
        }
    }
));