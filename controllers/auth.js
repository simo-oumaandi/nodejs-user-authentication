const User = require('../models/User');

exports.signup = async (req, res, next) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ error: "User is already exist with this email" });
    }


    try {
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        const saveUser = await user.save();
        res.status(201).json({ message: "Signup successfull" });
    } catch (err) {
        console.log("there is something went wrong");
        next(err);
    }
}