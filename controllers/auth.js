const User = require('../models/User');
const mailgun = require("mailgun-js");
const jwt = require('jsonwebtoken');

const DOMAIN = 'sandboxfea062f894ad4acfac016e831293b35d.mailgun.org';
const mg = mailgun({ apiKey: process.env.API_KEY, domain: DOMAIN });


exports.signup = async (req, res, next) => {
    console.log("coming the request");
    console.log(req.body);
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ error: "User is already exist with this email" });
    }


    


    try {
        // MAKING A TOKEN 
        const token = jwt.sign({name, email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '20m'});



        // EMAIL SEND 
        const data = {
            from: 'mdshayon0@gmail.com',
            to: email,
            subject: 'Account Acctivation',
            // text: 'Testing some Mailgun awesomness!',
            html: `
                    <div>
                        <h2>Email verification</h2>
                        <p>please click the link to activate your account</p>
                        <P>${process.env.CLIENT_REACT_URL}/authentication/activate/${token}</p>
                    </div>
            `,
        };


        // const send
        mg.messages().send(data, function (error, body) {
            if(error) return next(error);
            console.log(body);
            return res.json({message: "Email is been sent, Kindly activate your account"})
        });




        /*
        // SAVE USER TO DATA BASE 
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        const saveUser = await user.save();
        */


        // res.status(201).json({ message: "Signup successfull" });
    } catch (err) {
        console.log("there is something went wrong");
        next(err);
    }
}








exports.activate = async (req, res, next) => {
    console.log("coming the request");
    res.send('this is api/signup')
}