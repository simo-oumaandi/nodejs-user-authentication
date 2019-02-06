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



// REGISTER HANDLE
router.post('/register', (req, res)=>{
    console.log(req.body);
    res.send('hello');
})


module.exports = router;