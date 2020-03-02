const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    fname: {
        type: String,
        // required: true
    },
    lname: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    }
});



userSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}


userSchema.methods.comparePassword = (password, hash) => {
    console.log("Password is comparing");
    return bcrypt.compareSync(password, hash);
}


module.exports = mongoose.model('user', userSchema);