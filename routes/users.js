// LOGIN REGISTER ROUTES ARE HERE

const express = require('express');
const router = express.Router();


// LOGIN SYSTEM
router.get('/login', (req, res)=>{
    res.render("login");
});


// REGISTER SYSTEM
router.get('/register', (req, res)=>{
    res.render("register");
});


module.exports = router;