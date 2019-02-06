// LOGIN REGISTER ROUTES ARE HERE

const express = require('express');
const router = express.Router();


// LOGIN SYSTEM
router.get('/login', (req, res) => {
    res.render("login");
});


// REGISTER SYSTEM
router.get('/register', (req, res) => {
    res.render("register");
});



// REGISTER HANDLE
router.post('/register', (req, res) => {
    //DESTRUCTURING ALL PROPERTY FROM REQ.BODY
    const {
        name,
        email,
        password,
        password2
    } = req.body;

    let errors = [];

    //CHECK REQUIRED FIELDS
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: "Please fill all fields"
        });
    }

    //CHECK PASSWORD MATCH
    if (password != password2) {
        errors.push({
            meg: "password didn't match"
        });
    }

    //CHECK PASSWORD LENGTH
    if (password.length < 6) {
        errors.push({
            msg: "password must be atleast 6 charecter"
        });
    }


    //IF THERE IS NO ERROR IT WILL RENDER
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        res.send('pass');
    }


})


module.exports = router;