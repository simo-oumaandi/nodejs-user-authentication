const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');





router.post('/register', async (req, res, next) => {
    // VALIDATE DATA BEFORE MAKING A USER

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ "Error": error.details[0].message });
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const saveUser = await user.save();
        res.status(201).json({
            "user info": saveUser
        });
    } catch (error) {
        res.status(400).json({
            "error": error
        });
    }
});



router.post('/login', (req, res, next) => {
    res.send("login");
});




module.exports = router;