const { Schema, Model } = require('../../mongo_connect')

/**
 * Propriedades Calculadas:
 *  Rank
 *  Level
 *  Badges
 */
const userSchema = Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    experience: {
        type: Number
    },
    description: {
        type: String
    },
    picture: {
        type: String
    },
    follow: {
        type: [Number]
    },
    year: {
        type: Number
    },
    course: {
        type: String
    },
    upvotes: {
        type: Number
    },
    notifications: {
        type: [Number]
    }
})


const User = Model('User', userSchema)
// console.log(User.schema.tree) //Schema do Model

module.exports = {
    User: User,
    userSchema: userSchema
}