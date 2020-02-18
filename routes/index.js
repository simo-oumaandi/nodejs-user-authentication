const express = require('express');
const router = express.Router();

const loggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/signin');
    }
}

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});


// router.get('/signup', (req, res, next) => {
//     res.render('signup');
// });

router.get('/signin', (req, res, next) => {
    res.render('signin');
});


router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.get('/profile', (req, res, next) => {
    res.send(req.session);
});


router.get('/signout', loggedin, (req, res, next) => {
    req.logout();
    res.redirect('/signin');
})






module.exports = router;