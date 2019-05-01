const { Schema, Model } = require('../../mongo_connect')

// console.log(Schema, Model)

const threadSchema = Schema({
    id:{
        type: Number
    },
    userInfo:{
        userid:Number,
        photo: String,
        name: String,
        rank:String     
    },  
    title:{
        type: String
    },
    question:{
        type: String
    },
    tags:[{
        id:Number,
        text:String
    }],
    upvotes:{
        type: Number
    },
    date:{
        type:Date
    },
    closeDate:{
        type: Date,
        default: null
    },
    views:{
        type: Number
    }
})

const Thread= Model("Thread",threadSchema)

module.exports={
    Thread:Thread,
    threadSchema: threadSchema
}