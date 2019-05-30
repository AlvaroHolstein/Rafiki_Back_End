const { Answer } = require("../models/answers.model");

let crudAnswer = {
  //Add Answer
  addAnswer(res, idThread, answer) {
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
        userInfo: {
          userid: answer.user.id,
          photo: answer.user.photo,
          name: answer.user.name,
          rank: answer.user.rank
        },
        answer: answer.answer
      });

      newAnswer.save(function(err) {
        if (err) throw err;
        console.log("Answer Added");
      });
    });
  },

  //Get Answers By Thread Id
  findAnswers(res, id) {
    /**
     * Este id vai ser um array para poder encontrar logo todas as answers
     * que queremos, em vez de ir buscar todas,
     * vai acontecer o mesmo para os comments.
     * UPDATE:
     * Não vai poder ser um array por causa da maneira como
     * o caminho (threads/:id/answers), e assim já devolve
     * todas ans
     */
    Answer.find({ idThread: id }, function(err, collection) {
      if (err) throw err;
      res.json(collection);
    });
  },
  findByUserId(res, id) {
    Answer.find({ "userInfo.userid": id }, (err, collection) => {
      if (err) console.log(err, "Erro no findByUserId");
      res.json(collection);
    });
  },
  //Add Upvote
  answerUpvote(id) {
    Answer.findOneAndUpdate({ id: id }, { $inc: { upvotes: 1 } }, function(
      err,
      answer
    ) {
      if (err) throw err;
      console.log("Upvote Acrescentado", answer);
    });
  },

  //Remove Upvote
  answerDownvote(id) {
    Answer.findOneAndUpdate({ id: id }, { $inc: { upvotes: -1 } }, function(
      err,
      answer
    ) {
      if (err) throw err;
      console.log("Upvote Tirado", answer);
    });
  },
  deleteAnswer(id) {
    Answer.findOneAndRemove({ id: id }, err => {
      if (err) throw err;
      else console.log("Answer Deleted");
    });
  }
};
module.exports = crudAnswer;
