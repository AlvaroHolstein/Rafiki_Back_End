const { Schema, Model } = require('../../mongo_connect')

const answerSchema=Schema({
    id:{
        type:Number
    },
    idThread:{
        type:Number
    },
    idUser:{
        type:Number
    },
    answer:{
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

const Answer= Model("Thread",answerSchema)

module.exports={
    Answer:Answer,
    answerSchema: answerSchema
}