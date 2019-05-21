const { Answer } = require("../models/answers.model");
const { Comment } = require("../models/comments.model");
const { Thread } = require("../models/threads.model");
const { User } = require("../models/users.model");

let stats = {
  //GetAvgUpvotes
  GetAvgUpvotes(res) {
    Thread.find({}, (err, collection) => {
      if (err) throw err;
      let upvotes = collection.map(thread => thread.upvotes);

      let avg =
        upvotes.reduce((total = 0, value, index) =>
          index + 1 <= upvotes.length ? (total += value) : 0
        ) / upvotes.length;

      res.json(avg);
    });
  },
  //GetUserUpvotes
  GetUserUpvotes(res, id) {
    Thread.find({ "userInfo.userID": id }, (err, collection) => {
      if (err) throw err;
      let upvotesArr = collection.map(thread => thread.upvotes);

      let upvotes = upvotesArr.reduce((total = 0, value, index) =>
        index + 1 <= upvotesArr.length ? (total += value) : 0
      );

      res.json(upvotes);
    });
  },
  //GetAvgNumberOfThreads
  GetAvgNumberOfThreads(res) {
    let max = 0;
    let aux = 0;
    let min = 100000000;

    Thread.find({}, (err, collection) => {
      let users = collection.map(thread => thread.userInfo.userid);

      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < collection.length; j++) {
          if (users[i] == collection[j].userInfo.userid) {
            aux++;
          }
        }
        if (aux > max) max = aux;
        if (aux < max) min = aux;
        aux = 0;
      }
      console.log((max + min) / 2);
      res.json((max + min) / 2);
    });
  },
  //GetUserNumberOfThreads
  GetUserNumberOfThreads(res, id) {
    Thread.find({ "userInfo.userID": id }, (err, collection) => {
      if (err) throw err;
      res.json(collection.length);
    });
  },
  //GetAvgLevel
  GetAvgLevel(res) {
    User.find({}, (err, collection) => {
      if (err) throw err;
      let users = collection.map(user => user.experience);
      let avgLevel =
        users.reduce((total = 0, value, index) =>
          index + 1 <= users.length ? (total += value) : 0
        ) / collection.length;
      res.json(avgLevel / 100);
    });
  },
  //GetUserLevel
  GetUserLevel(res, id) {
    User.findById(id, (err, collection) => {
      res.json(collection.experience / 100);
    });
  },
  //GetAvgNumberOfComments (comments+answers)
  GetAvgNumberOfComments(res) {
    Comment.find({}, (err, collection) => {
      let users = collection.map(comment => comment.userInfo.userid);
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < collection.length; j++) {
          if (users[i] == collection[j].userInfo.userid) {
            aux++;
          }
        }
        if (aux > max) max = aux;
        if (aux < max) min = aux;
        aux = 0;
      }
      console.log((max + min) / 2);
      res.json((max + min) / 2);
    });
  },
  GetAvgNumberOfAnswers(res) {
    Answer.find({}, (err, collection) => {
      let users = collection.map(answer => answer.userInfo.userid);
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < collection.length; j++) {
          if (users[i] == collection[j].userInfo.userid) {
            aux++;
          }
        }
        if (aux > max) max = aux;
        if (aux < max) min = aux;
        aux = 0;
      }
      console.log((max + min) / 2);
      res.json((max + min) / 2);
    });
  },
  //GetUserNumberOfComments
  GetUserNumberOfComments(res, id) {
    Comment.find({ "userInfo.userID": id }, (err, collection) => {
      if (err) throw err;
      res.json(collection.length);
    });
  },
  GetUserNumberOfAnswers(res, id) {
    Answer.find({ "userInfo.userID": id }, (err, collection) => {
      if (err) throw err;
      res.json(collection.length);
    });
  }
};

module.exports = stats;
