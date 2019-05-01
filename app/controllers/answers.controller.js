const { Answer } = require("../models/answers.model");

let crudAnswer = {
  //Add Answer
  addAnswer(idThread, idUser, answer) {
    let id = 1;

    let answers = [];

    Answer.find({}, (err, collection) => {
      if (err) throw err;
      answers = collection;

      if (answers.length != 0) {
        answers.sort(function(a, b) {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
        });
        id = answers[answers.length - 1].id + 1;
      }

      let newAnswer = Answer({
        id: id,
        idThread: idThread,
        idUser: idUser,
        answer: answer
      });

      newAnswer.save(function(err) {
        if (err) throw err;
        console.log("Answer Added");
      });
    });
  },

  //Get Answers By Thread Id
  findAnswers(res, id) {
    Answer.find({ idThread: id }, function(err, collection) {
      if (err) throw err;
      res.json(collection);
    });
  },

  //Add Upvote
  answerUpvote(id) {
    Answer.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, function(
      err,
      answer
    ) {
      if (err) throw err;
      console.log(answer);
    });
  },

  //Remove Upvote
  answerDownvote(id) {
    Answer.findByIdAndUpdate(id, { $inc: { upvotes: -1 } }, function(
      err,
      answer
    ) {
      if (err) throw err;
      console.log(answer);
    });
  }
};
module.exports = crudAnswer;
