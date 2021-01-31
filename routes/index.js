const express = require('express');
const router = express();
const Story = require('../models/Story');
// MIDDLEWARE WILL BE ADDED IN SECOND AGRUEMENT OF A ROUTE 
const { ensureAuth, ensureGuest } = require('../middleware/auth');


router.get('/', ensureGuest, (req, res, next) => {
    res.render('login', {
        layout: 'login'
    });
});



router.get('/dashboard', ensureAuth, async (req, res, next) => {
    console.log(req.user);
    try {
        const stories = await Story.find({ user: req.user.id }).lean(); // PLAIN JS OBJECT, NOT MONGOOSE DOCUMENT
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});




module.exports = router;