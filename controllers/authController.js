const jwt = require('jsonwebtoken');
const User = require('../models/User');


// HANDLE ERRORS
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };


    // INCORRECT EMAIL
    if(err.message === "incorrect email"){
        errors.email = "Email is not registered";
    }


        // INCORRECT EMAIL
        if(err.message === "incorrect password"){
            errors.email = "Password is incorrect";
        }


    // DUBLICATE ERROR CODE
    if (err.code === 11000) {
        errors.email = "This email is already registered";
        return errors;
    }


    // VALIDATION ERRORS
    if (err.message.includes("user validation failed")) {
        // LOG OUT ARRAY OR ERROR
        // console.log(Object.values(err.errors));
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(properties);
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}











// CREATE TOKEN
const maxAge = 3 * 24 * 60 * 60; // 3 days in mili seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, {
        expiresIn: maxAge
    });
}


module.exports.signup_get = (req, res, next) => {
    res.render('signup');
}


module.exports.login_get = (req, res, next) => {
    res.render('login');
}


module.exports.signup_post = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(email);
    // console.log(password);
    try {
        // https://mongoosejs.com/docs/api/document.html#document_Document-directModifiedPaths
        const user = await User.create({ email, password });
        // CREATING JWT TOKEN
        const token = createToken(user._id);
        // PLACE TOKEN IN COOKIE AND RETURN IT
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}



module.exports.login_post = async (req, res, next) => {
    // GETTING DATA FROM FRONTED JS USING FETCH API
    const { email, password } = req.body;
    // console.log(req.body);
    try {
        // LOGIN METHOD IS IN THE USER MODEL FILE
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        // THIS ERR WE CAN GET FROM USER MODELS LOGIN METHOD
        res.status(400).json({errors});
    }
}









module.exports.logout_get = async (req, res, next)=>{
    // REMOVE JWT TOKEN FROM BROWSER
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}