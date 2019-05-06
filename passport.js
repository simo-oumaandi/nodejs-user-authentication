var localStrategy = require('passport-local').Strategy;
// var User = require('./model/User');
var User = require('./model/user');

module.exports = function (passport) {
    //ADD TO SESSION
    passport.serializeUser(function (user, done) {
        done(null, user);
    })
    // REMOVE FROM SESSION
    passport.deserializeUser(function (user, done) {
        done(null, suer);
    })

    passport.use(new localStrategy(function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                done(err)
            } else {
                if (doc) {
                    var valid = doc.comparePassword(password, doc.password)
                    if (valid) {
                        // do not add password hash to session
                        done(null, {
                            username: doc.username,
                            id: doc._id
                        })
                    } else {
                        done(null, false)
                    }
                } else {
                    done(null, false)
                }
            }
        })
    }))
}