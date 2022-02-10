const express = require('express')
const router = express.Router()
const joi = require('joi')
const Post = require('../models/Post')
const { auth } = require('../middleware/auth')

const validatePost = (post) => {
    const schema = joi.object({
        title : joi.string().min(2).required(),
        desc : joi.string().required(),
        photo : joi.string().required(),
        categories : joi.array().items(joi.string())        
    })

    const result = schema.validate(post)
    return result
}

router.post('/', auth, async (req,res) => {
    const result = validatePost(req.body)
    if (result.error){
        return res.status(400).json({error: result.error.details[0].message})
    }
    try{
        // create object
        const newPost = {
            title : req.body.title,
            desc : req.body.desc,
            photo : req.body.photo,
            categories : req.body.categories,
            author : req.user.id
        }
        const post = new Post(newPost)
        await post.save()
        return res.send(post)
    } catch (err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

router.put('/:id', auth, async (req,res) => {
    const result = validatePost(req.body)
    if (result.error){
        return res.status(400).json({error : result.error.details[0].message})
    }
    try{
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({error: "No Object found"})
        }
        if(post.author.toString() !== req.user.id.toString()){
            return res.status(403).json({ msg : "Access denied. You're not the owner code"});
        }
        const {
            title,
            desc,
            photo,
            categories
        } = req.body; 

        //update post
        if (title) post.title = title;
        if (desc) post.desc = desc;
        if (photo) post.photo = photo;
        if (categories) post.categories = categories;

        await post.save()
        return res.send(post)
    } catch(err){
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({error: "No Object found"})
        }
        return res.status(400).send('Server Error')
    }
})

router.get('/:id', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id).populate('author', 'username')
        if (!post) {
            return res.status(404).json({error: "No object found"})
        }
        return res.send(post)
    } catch(err){
        console.error(err.message)
        // if (err.kind === 'ObjectId'){
        //     return res.status(404).json({error: "No object found"})
        // }
        res.status(400).send('Server Error')
    }
})

module.exports = router;