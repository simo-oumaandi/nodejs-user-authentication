const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// PASSPORT JS IS ONLY FOR LOGIN NOT FOR SIGNUP
// This is documantation for passport configure http://www.passportjs.org/docs/configure/


//LOAD USER MODEL
const User = require('../models/Users');


module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            //MATCH USER
            User.findOne({
                    email
                })
                .then(user => {
                    //MATCH USER
                    if (!user) {
                        return done(null, false, {
                            message: 'This email is not registered'
                        });
                    }

                    //MATCH PASSWORD
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: "Incorrect password"
                            });
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );

    //WE NEED SERILIZE USER AND DESERELIZE USER
    // This is documantation for passport configure http://www.passportjs.org/docs/configure/
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}