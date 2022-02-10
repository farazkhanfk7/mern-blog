const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    desc : {
        type : String,
        required : true
    },
    photo : {
        type: String,
        required: true
    },
    categories : [
        {
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref : 'category'  
            }
        }
    ]
}, {timestamps: true})

module.exports = Post = mongoose.model('post', PostSchema);