const express = require('express');
const passport = require('passport');
const router = express();


// AUTH 
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));



// CALLBACK
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res, next) => {
    res.redirect('/dashboard');
});




router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/');
});




module.exports = router;