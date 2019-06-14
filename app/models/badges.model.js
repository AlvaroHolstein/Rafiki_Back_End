const { Schema, Model } = require("../../mongo_connect")

const badgeSchema = Schema ({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    goal: {
        type: Number 
    },
    desc: {
        type: String
    },
    category: {
        type: String
    },
    specific: {
        type: String,
        default: ""
    }
});

const Badge = Model("Badge", badgeSchema)

module.exports = {
    Badge: Badge,
    badgeSchema:  badgeSchema
};