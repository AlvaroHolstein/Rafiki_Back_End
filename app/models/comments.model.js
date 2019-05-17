const { Schema, Model } = require("../../mongo_connect");

const commentSchema = Schema({
  id: {
    type: Number
  },
  idAnswer: {
    type: Number
  },
  userInfo: {
    userid: Number,
    photo: String,
    name: String,
    rank: String
  },
  comment: {
    type: String
  },
  upvotes: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = Model("Comment", commentSchema);

module.exports = {
  Comment: Comment,
  commentSchema: commentSchema
};
