const { Schema, Model } = require('../../mongo_connect')

console.log(Schema, Model)

const threadSchema = Schema({
    id:{
        type: Number
    },
    userid:{
        type: Number
    },
    title:{
        type: String
    },
    question:{
        type: String
    },
    tags:{
        type: Array
    },
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