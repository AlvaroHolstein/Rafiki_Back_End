const { Schema, Model } = require("../../mongo_connect")


const expLogSchema = Schema({
    targetId: {
        type: Number
    },
    targetType: {
        /** Os targetTypes vão ser thread, answer e comment */
        type: String
    },
    logType: {
        /** o logTupe vai ser follow ou upvote */
        type: String
    },
    expUserInfo: {
        userId: { type: Number },
        name: { type: String },
        rank: { type: String } //TAlvez ficasse melhor a experiencia aqui
        /* Aqui não vale a pena ter a foto, penso eu de que
        é só mais merda a ocupar memória */
    },
    receiverUserInfo: { //Mudar isto socoro
        userId: { type: Number },
        name: { type: String },
        rank: { type: String }
    },
    expValue: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const expLog = Model("ExpLog", expLogSchema)
module.exports = expLog;