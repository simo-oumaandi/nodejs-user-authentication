
// https://joi.dev/api/?v=17.2.1
// joi lets you describe your data using a simple, intuitive, and readable language.
const Joi = require('joi');


// REGISTER VALIDATION 
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });


    // const validation = schema.validate(req.body);
    return schema.validate(data);
    // res.send(error.details[0].message);
}



// REGISTER VALIDATION 
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });


    // const validation = schema.validate(req.body);
    return schema.validate(data);
    // res.send(error.details[0].message);
}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
