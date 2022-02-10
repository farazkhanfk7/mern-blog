const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: ""
    }
}, {timestamps: true})

module.exports = User = mongoose.model('user', UserSchema);