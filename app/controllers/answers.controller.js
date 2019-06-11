const { Answer } = require("../models/answers.model");

let crudAnswer = {
  //Add Answer
  addAnswer(res, idThread, answer) {
    try {
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
            userid: answer.userInfo.userid,
            photo: answer.userInfo.photo,
            name: answer.userInfo.name,
            rank: answer.userInfo.rank
          },
          answer: answer.answer
        });

        newAnswer.save(function(err) {
          if (err) throw err;
          res.json({success: true, answer: newAnswer})
          console.log("Answer Added");
        });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not add Answer" + err });
    }
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
    try {
      Answer.find({ idThread: id }, function(err, collection) {
        if (err) throw err;
        res.json(collection);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find answers" + err });
    }
  },
  findByUserId(res, id) {
    try {
      Answer.find({ "userInfo.userid": id }, (err, collection) => {
        if (err) console.log(err, "Erro no findByUserId");
        res.json(collection);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find answers" + err });
    }
  },
  //Add Upvote
    answerUpvote(res, id) {
    try {
      Answer.findOneAndUpdate({ id: id }, { $inc: { upvotes: 1 } }, function(
        err,
        answer
      ) {
        if (err) throw err;
        res.json({msg: "Sucesso a inserir upvote", success: true})
        console.log("Upvote Acrescentado", answer);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not upvote answer" + err });
    }
  },

  //Remove Upvote
  answerDownvote(res, id) {
    try {
      Answer.findOneAndUpdate({ id: id }, { $inc: { upvotes: -1 } }, function(
        err,
        answer
      ) {
        if (err) throw err;
        res.json({msg: "Sucesso a remover upvote", success: true})
        console.log("Upvote Tirado", answer);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not downvote answer" + err });
    }
  },
  deleteAnswer(id) {
    try {
      Answer.findOneAndRemove({ id: id }, err => {
        if (err) throw err;
        else console.log("Answer Deleted");
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not delete answer" + err });
    }
  },
  updateUserInfo(user) {
    try {
      Answer.updateMany(
        { "userInfo.userid": user.userid },
        { userInfo: user },
        function(err, answer) {
          if (err) throw err;
          console.log(answer);
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not update answer" + err });
    }
  }
};
module.exports = crudAnswer;
