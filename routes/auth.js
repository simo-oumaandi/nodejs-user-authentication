const express = require('express');
const User = require('../models/User');

const router = express.Router();


module.exports = (passport) => {
    /* GET home page. */
    router.post('/signup', (req, res, next) => {
        const { username, password } = req.body;

        User.findOne({ username: username }, (err, docs) => {
            if (err) {
                res.status(500).send('error occered');
            } else {
                if (docs) {
                    res.status(500).send('username already exist');
                } else {
                    let record = new User();
                    record.username = username;
                    record.password = record.hashPassword(password);
                    record.save((err, user) => {
                        if (err) {
                            res.status(500).send('db error');
                        } else {
                            res.send(user);
                        }

                    });
                }
            }
        })
    });


    // THIS IS FOR SIGNIN
    router.post('/signin',
        passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/signin',
            failureFlash: true
        }),
        (req, res, next) => {
            res.send('hay');
        }
    );


    return router;
}



// module.exports = router;