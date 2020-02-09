const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res, next) {
    res.render('users/signup');
});
router.get('/signin', (req, res, next) => {
    res.render('users/signin');
});

module.exports = router;