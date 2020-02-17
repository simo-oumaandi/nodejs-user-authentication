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




// http://www.passportjs.org/packages/passport-local/
passport.use('local.signup', new LocalStrategy({
        emailField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, done) => {
        // https://express-validator.github.io/docs/validation-chain-api.html
        req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        req.checkBody('password', 'invalid password').notEmpty().islength({
            min: 4
        });





        // HAVE TO WORK WITH IT
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
                newUser.password = newUser.encryptPassword(password);

                //SAVING USER TO DATABASE
                newUser.save((err, result) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                });

            }
        );


    }
));