const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

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
    isAdmin: {
        type: Boolean,
        default: false
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

UserSchema.methods.generateAuthToken = function() {
    const secretKey = process.env.SECRET_KEY
    const payload = {
        user: { 
            id : this._id,
            isAdmin: this.isAdmin 
        }
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: 360000 })
    return token
}

module.exports = User = mongoose.model('user', UserSchema);