const { Schema, Model } = require("../../mongo_connect");

<<<<<<< HEAD
// console.log(Schema, Model)
=======
console.log(Schema, Model);
>>>>>>> 1a89a3a9b38c21c03ebcea61867db58b343f7729

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
  }
});

const Thread = Model("Thread", threadSchema);

module.exports = {
  Thread: Thread,
  threadSchema: threadSchema
};
