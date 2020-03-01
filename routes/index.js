const express = require('express');
const User = require('../models/User');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    // let message = req.flash('msg');
    User.find((err, docs) => {
        console.log(docs);
        res.render('index', { message: docs })
    });
});

module.exports = router;