const express = require('express');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const router = express.Router();


router.get('/',  (req, res, next) => {
    res.render('index');
});

router.get('/dashboard',  (req, res, next) => {
    res.render('dashboard');
});


module.exports = router;