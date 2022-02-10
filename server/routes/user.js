const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { auth , authOwner, authOwnerOrAdmin } = require('../middleware/auth')
const User = require('../models/User')
const Post = require('../models/Post')

// Update User
router.put('/:id', authOwner, async (req,res) => {
    const user = await User.findById(req.user.id)
    if (!user){
        return res.status(400).json({error: "User doesn't exists"})
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(req.body.password, salt)
        const updatedUser = await User.findByIdAndUpdate(req.user.id,{
            $set: {
                username : req.body.username,
                email : req.body.email,
                password : newpassword
            }
        })
        return res.status(200).json(updatedUser)
    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// DELETE USER
router.delete('/:id', authOwnerOrAdmin, async (req,res) => {
    const user = await User.findById(req.user.id)
    if (!user){
        return res.status(400).json({error: "User doesn't exists"})
    }
    try{
        await Post.deleteMany({ username: user.username })
        const user = await User.findByIdAndDelete(req.user.id)
        return res.status(200).json('User deleted succesfully')
    }catch(err){
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
})


// GET User
router.get("/:id", async (req,res) => {
    try{
        const user = await User.findById(req.params.id).select('-password')
        return res.status(200).json(user)
    } catch(err){
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
})

module.exports = router;