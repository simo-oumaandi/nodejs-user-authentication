const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');




// register
router.post('/register', async (req, res, next) => {
    // VALIDATE DATA BEFORE MAKING A USER

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ "Error": error.details[0].message });

    // CHECK IF THE USER IS ALREADY IN THE DATABASE
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).json({ "Error: ": "Email already exist" });
        next();
    }


    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
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


// login 
router.post('/login', async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ "Error": error.details[0].message });



    // CHECK IF THE USER IS ALREADY IN THE DATABASE
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ "Error: ": "Email doesn't exist" });


    // CHECK FOR PASSWORD
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({"Error: ": "Incorrect password"});


    // CREATE AND ASSIGN TOKEN
    const token = jwt.sign({_id: user._id}, "THIS_IS_TOKEN_SECRET");
    res.header('auth-token', token).status(200).json({'msg': "everything is working", "token": token});
});




module.exports = router;