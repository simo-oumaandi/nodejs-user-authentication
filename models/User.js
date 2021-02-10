


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});





// //We'll use this later on to make sure that the user trying to log in has the correct credentials
// UserSchema.methods.isValidPassword = async function(password){
//     const user = this;
//     //Hashes the password sent by the user for login and checks if the hashed password stored in the 
//     //database matches the one sent. Returns true if it does else false.
//     const compare = await bcrypt.compare(password, user.password);
//     return compare;
//   }

  

module.exports = mongoose.model('user', userSchema);