const express = require('express');
const router = express();


// MIDDLEWARE WILL BE ADDED IN SECOND AGRUEMENT OF A ROUTE 
const {ensureAuth, ensureGuest} = require('../middleware/auth');


router.get('/', ensureGuest, (req, res, next) => {
    res.render('login', {
        layout: 'login'
    } );
});



router.get('/dashboard', ensureAuth, (req, res, next) => {
    console.log(req.user);
    res.render('dashboard' );
});




module.exports = router;