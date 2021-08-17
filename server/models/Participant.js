const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const participantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('participant', participantSchema);