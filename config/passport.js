const LocalStretegy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
    // ADD USER TO THE SESSION
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    // REMOVE USER FROM SESSION
    passport.deserializeUser((user, done) => {
        done(null, user);
    });


    // STRETEGY FOR LOGIN
    passport.use(new LocalStretegy((username, password, done) => {
        console.log(username, password);
        User.findOne({ username, username }, (err, docs) => {
            if (err) {
                done(err);
            } else {
                if (docs) {
                    let valid = docs.comparePassword(password, docs.password);
                    if (valid) {
                        done(null, {
                            username: docs.username,
                            password: docs.password
                        })
                    } else {
                        done(null, false);
                    }
                } else {
                    done(null, false);
                }
            }
        })
    }))
}