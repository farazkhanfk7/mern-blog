const express = require('express')
const router = express.Router()
const User = require('../models/User')
const joi = require('joi')
const bcrypt = require('bcrypt')

const validateUser = (user) => {
    const schema = joi.object({
        username : joi.string().min(2).required(),
        email : joi.string().email().required(),
        isAdmin : joi.boolean(),
        password : joi.string(),
        profilepic : joi.string()
    })

    const result = schema.validate(user)
    return result
}

// Register
router.post('/register', async (req, res) => {
    const result = validateUser(req.body)
    if (result.error){
        return res.status(400).json({error: result.error.details[0].message})
    }
    try{
        // check if user already exists
        const check_user = await User.findOne({$or: [
            {username: req.body.username},
            {email: req.body.email}
        ]})
        if (check_user){
            return res.status(401).json({error:"User already exists"})
        }
        // create object
        const newUser = {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            profilepic : req.body.profilepic
        }
        const user = new User(newUser)
        
        // bcrypt hashing
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        // save
        await user.save()

        //return jwt token 
        const token = user.generateAuthToken()
        return res.send(token)
    } catch (err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router;