// HOME AND DASHBOARD BELONG HERE

const express = require('express');
const router = express.Router();

//BY USING THIS WE CAN'T NO LONGER ACCESS TO DASHBOARD WITHOUT LOGIN
const {ensureAuthenticated} = require('../config/auth');


router.get('/', (req, res)=>{
    res.render('welcome');
})
router.get('/dashboard', ensureAuthenticated,  (req, res)=>{
    res.render('dashboard', {
        name: req.user.name
    });
})


module.exports = router;