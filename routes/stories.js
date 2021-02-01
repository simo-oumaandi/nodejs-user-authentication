const express = require('express');
const router = express();
const Story = require('../models/Story');
// MIDDLEWARE WILL BE ADDED IN SECOND AGRUEMENT OF A ROUTE 
const { ensureAuth } = require('../middleware/auth');

console.log("Storis");
router.get('/add', ensureAuth, (req, res, next) => {
    res.render('stories/add');
});








module.exports = router;