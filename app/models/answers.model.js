const { Schema, Model } = require("../../mongo_connect");

const answerSchema = Schema({
  id: {
    type: Number
  },
  idThread: {
    type: Number
  },
  userInfo: {
    userid: Number,
    photo: String,
    name: String,
    rank: String
  },
  answer: {
    type: String
  },
  upvotes: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: new Date().toISOString()
  }
});

const Answer = Model("Answer", answerSchema);

module.exports = {
  Answer: Answer,
  answerSchema: answerSchema
};
