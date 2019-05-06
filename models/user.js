let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let ExpressValidator = require('express-validator');


mongoose.connect('mongodb://localhost/nodeauth');

let db = mongoose.connection;


//USER SCHEMA
let UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});



let User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}


module.exports.getUserByUsername = function (username, callback){
    let query = {username:username};
    User.findOne(query, callback)
}

module.exports.comparePassword = function (candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        callback(null, isMatch);
    });
}


module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}