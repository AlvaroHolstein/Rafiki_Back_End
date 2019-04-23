const { Schema, Model } = require('../../mongo_connect')

const userSchema = Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    pasword: {
        type: String
    },
    email: {
        type: String
    },
    experience: {
        type: Number
    },
    level: {
        type: Number
    },
    rank: {
        type: String
    },
    
})

console.log(Schema, Model)