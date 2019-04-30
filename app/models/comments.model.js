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
    answer:{
        type:String
    },
    upvotes:{
        type:Number
    },
    date:{
        type:Date
    }
})

const Comment= Model("Thread",commentSchema)

module.exports={
    Comment:Comment,
    commentSchema: commentSchema
}