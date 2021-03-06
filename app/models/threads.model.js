const { Schema, Model } = require("../../mongo_connect");

// console.log(Schema, Model);

const threadSchema = Schema({
  id: {
    type: Number
  },
  userInfo: {
    userid: Number,
    photo: String,
    name: String,
    rank: String
  },
  title: {
    type: String
  },
  question: {
    type: String
  },
  tags: {
    type: Array,
    default: []
  },
  upvotes: {
    type: Number
  },
  date: {
    type: Date
  },
  closeDate: {
    type: Date,
    default: null
  },
  views: {
    type: Number
  },
  follow: {
    type: Number,
    default: 0
  }
});

const Thread = Model("Thread", threadSchema);

module.exports = {
  Thread: Thread,
  threadSchema: threadSchema
};
