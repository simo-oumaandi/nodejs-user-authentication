const User = require('../models/User');


// HANDLE ERRORS
const handleErrors = (err ) =>{
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};


    // DUBLICATE ERROR CODE
    if(err.code === 11000){
        errors.email = "This email is already registered";
        return errors;
    }


    // VALIDATION ERRORS
    if (err.message.includes("user validation failed: email")){
        // LOG OUT ARRAY OR ERROR
        // console.log(Object.values(err.errors));
        Object.values(err.errors).forEach(({properties})=>{
            // console.log(properties);
            errors[properties.path] = properties.message;
        })
    }

    return errors;
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
        res.status(400).json({errors})
    }
}



module.exports.login_post = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    res.send('user login');
}