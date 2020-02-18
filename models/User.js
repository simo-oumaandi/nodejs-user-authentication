const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;



const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
userSchema.methods.hashPassword = (password) => {
    // https://www.npmjs.com/package/bcrypt#to-hash-a-password-1
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}



// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
userSchema.methods.comparePassword = (password, hash) => {
    // https://www.npmjs.com/package/bcrypt#to-hash-a-password-1
    return bcrypt.compareSync(password, hash);
}



module.exports = mongoose.model('users', userSchema, 'users');