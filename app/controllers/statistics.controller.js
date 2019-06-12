const { Answer } = require("../models/answers.model");
const { Comment } = require("../models/comments.model");
const { Thread } = require("../models/threads.model");
const { User } = require("../models/users.model");

let stats = {
  //GetAvgUpvotes
  GetAvgUpvotes(res) {
    try {
      Thread.find({}, (err, collection) => {
        if (err) throw err;
        let upvotes = collection.map(thread => thread.upvotes);

        let avg =
          upvotes.reduce((total = 0, value, index) =>
            index + 1 <= upvotes.length ? (total += value) : 0
          ) / upvotes.length;

        res.json(avg);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not get avg upvotes" + err });
    }
  },
  //GetUserUpvotes
  GetUserUpvotes(res, id) {
    try {
      console.log(id);
      Thread.find({ "userInfo.userid": id }, (err, collection) => {
        if (err) throw err;
        let upvotesArr = collection.map(thread => thread.upvotes);

        let upvotes = [];
        if (upvotesArr.length > 0) {
          upvotes = upvotesArr.reduce((total = 0, value, index) =>
            index + 1 <= upvotesArr.length ? (total += value) : 0
          );
        }
        console.log(collection);
        console.log("numero de upvotes", upvotes);
        res.json(upvotes);
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Could not get user upvotes" + err });
    }
  },
  //GetAvgNumberOfThreads
  GetAvgNumberOfThreads(res) {
    try {
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
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Could not get avg number of threads" + err });
    }
  },
  //GetUserNumberOfThreads
  GetUserNumberOfThreads(res, id) {
    try {
      Thread.find({ "userInfo.userid": id }, (err, collection) => {
        if (err) throw err;
        res.json(collection.length);
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Could not get user number of threads" + err });
    }
  },
  //GetAvgLevel
  GetAvgLevel(res) {
    try {
      User.find({}, (err, collection) => {
        if (err) throw err;
        let users = collection.map(user => user.experience);
        let avgLevel =
          users.reduce((total = 0, value, index) =>
            index + 1 <= users.length ? (total += value) : 0
          ) / collection.length;
        res.json(avgLevel / 100);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not get avg level" + err });
    }
  },
  //GetUserLevel
  GetUserLevel(res, id) {
    try {
      User.findOne({ id: id }, (err, collection) => {
        res.json(Math.round(collection.experience / 100));
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not get user level" + err });
    }
  },
  //GetAvgNumberOfComments (comments+answers)
  GetAvgNumberOfComments(res) {
    try {
      let aux = 0;
      let max = 0;
      let min = 1000000000;
      Comment.find({}, (err, collection) => {
        let users = collection.map(comment => comment.userInfo.userid);
        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < collection.length; j++) {
            if (users[i] == collection[j].userInfo.userid) {
              aux++;
            }
          }
          if (aux > max) max = aux;
          if (aux < min) min = aux;
          aux = 0;
        }
        console.log((max + min) / 2);
        res.json((max + min) / 2);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not avg nº comments" + err });
    }
  },
  GetAvgNumberOfAnswers(res) {
    try {
      let aux = 0;
      let max = 0;
      let min = 1000000000;
      Answer.find({}, (err, collection) => {
        let users = collection.map(answer => answer.userInfo.userid);
        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < collection.length; j++) {
            if (users[i] == collection[j].userInfo.userid) {
              aux++;
            }
          }
          if (aux > max) max = aux;
          if (aux < min) min = aux;
          aux = 0;
        }
        console.log((max + min) / 2);
        res.json((max + min) / 2);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not avg nº answers" + err });
    }
  },
  //GetUserNumberOfComments
  GetUserNumberOfComments(res, id) {
    try {
      Comment.find({ "userInfo.userid": id }, (err, collection) => {
        if (err) throw err;
        res.json(collection.length);
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Could not user nº comments" + err });
    }
  },
  GetUserNumberOfAnswers(res, id) {
    try {
      Answer.find({ "userInfo.userid": id }, (err, collection) => {
        if (err) throw err;
        res.json(collection.length);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not user nº answer" + err });
    }
  },
  //Hot Topics -- Top 5 threads com mais views e upvotes
  GetHotTopics(res) {
    try {
      Thread.find({}, (err, collection) => {
        if (err) throw err;
        let hotTopics = collection.map(thread => {
          let newObj = {
            id: thread.id,
            title: thread.title,
            upvotes: thread.upvotes,
            views: thread.views,
            points: thread.upvotes + thread.views
          };
          return newObj;
        });

        hotTopics = hotTopics.sort((a, b) => {
          if (a.points > b.points) return -1;
          if (a.points < b.points) return 1;
          else return 0;
        });
        hotTopics.length = 5;
        res.json(hotTopics);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not get hottopics" + err });
    }
  },
  //Users with more EXP
  expDistribution(res) {
    try {
      User.find({}, { _id: 0, password: 0, email: 0 }, (err, collection) => {
        if (err) throw err;
        collection = collection.sort((a, b) => {
          if (a.experience > b.experience) return -1;
          if (a.expDistribution < b.experience) return 1;
          else return 0;
        });
        collection.length = 5;
        res.json(collection);
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Could not get expdistribution" + err });
    }
  },

  //Top commentators - Users com mais respostas
  topCommentator(res) {
    try {
      Answer.find({}, (err, collection) => {
        let commentators = [];
        for (let i = 0; i < collection.length; i++) {
          if (
            commentators.findIndex(
              commentator =>
                commentator.userInfo.userid == collection[i].userInfo.userid
            ) == -1
          ) {
            commentators.push(collection[i]);
          }
        }
        commentators = commentators.map(commentator => {
          let newObj = {
            id: commentator.userInfo.userid,
            name: commentator.userInfo.name,
            number: 0
          };
          return newObj;
        });
        if (commentators.length > 1) {
          for (let i = 0; i < commentators.length; i++) {
            for (let j = 0; j < collection.length; j++) {
              if (commentators[i].id == collection[j].userInfo.userid) {
                commentators[i].number += 1;
                console.log("Devia Atualizar", commentators[i].number);
              }
            }
          }
          commentators = commentators.sort((a, b) => {
            if (a.number > b.number) return -1;
            if (a.number < b.number) return 1;
            else return 0;
          });

          commentators.length = 5;
        } else {
          for (let j = 0; j < collection.length; j++) {
            console.log("id1", topcommentators[0].id);
            console.log("id2", collection[j].userInfo.userid);
            if (commentators[0].id == collection[j].userInfo.userid) {
              commentators[0].number += 1;
              console.log("Devia Atualizar", commentators[0].number);
            }
          }
        }
        res.json(commentators);
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Could not get topcommentators" + err });
    }
  },
  mostViewed(res) {
    try {
      Thread.find({}, (err, collection) => {
        if (err) throw err;
        let hotTopics = collection.map(thread => {
          let newObj = {
            id: thread.id,
            title: thread.title,
            views: thread.views
          };
          return newObj;
        });

        hotTopics = hotTopics.sort((a, b) => {
          if (a.views > b.views) return -1;
          if (a.views < b.views) return 1;
          else return 0;
        });
        hotTopics.length = 5;
        res.json(hotTopics);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not get mostviewed" + err });
    }
  }
};

module.exports = stats;
