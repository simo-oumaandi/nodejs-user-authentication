// LOGIN REGISTER ROUTES ARE HERE

const express = require('express');
const router = express.Router();


// LOGIN SYSTEM
router.get('/login', (req, res)=>{
    res.send("from user login");
});


// REGISTER SYSTEM
router.get('/register', (req, res)=>{
    res.send("from user register");
});


module.exports = router;