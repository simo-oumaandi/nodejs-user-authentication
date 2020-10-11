const User = require('../models/User');


// HANDLE ERRORS
const handleErrors = (err ) =>{
    console.log(err.message, err.code);
    let error = {email: '', password: ''};


    // VALIDATION ERRORS
    if (err.message.includes("user validation failed: email")){
        console.log(err);
    }
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
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send("error, user is not created")
    }
}



module.exports.login_post = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    res.send('user login');
}