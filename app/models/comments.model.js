const { Schema, Model } = require('../../mongo_connect')

const commentSchema=Schema({
    id:{
        type:Number
    },
    idAnswer:{
        type:Number
    },
    idUser:{
        type:Number
    },
    comment:{
        type:String
    },
    upvotes:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Comment= Model("Thread",commentSchema)

module.exports={
    Comment:Comment,
    commentSchema: commentSchema
}