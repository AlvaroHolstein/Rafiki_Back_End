const { Comment } = require("../models/comments.model");

let crudComment = {
  //Add Comment
  addComment(res, idAnswer, comment) {
    try {
      let id = 1;

      let comments = [];

      Comment.find({}, (err, collection) => {
        if (err) throw err;
        comments = collection;

        if (comments.length != 0) {
          comments.sort(function(a, b) {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
          });
          id = comments[comments.length - 1].id + 1;
        }

        let newComment = Comment({
          id: id,
          idAnswer: idAnswer,
          userInfo: {
            userid: comment.user.id,
            photo: comment.user.photo,
            name: comment.user.name,
            rank: comment.user.rank
          },
          comment: comment.comment
        });

        newComment.save(function(err) {
          if (err) throw err;
          console.log("Comment Added");
        });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not add comment" + err });
    }
  },
  findUserComments(res, id) {
    try {
      Comment.find({ "userInfo.userid": id }, (err, collection) => {
        if (err) console.log(err, "Erro no findUserComments");
        res.json(collection);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find comments" + err });
    }
  },
  //Get Comment By Answer ID
  findComments(res, id) {
    /**
     * O id também vai ser um array // Será que funciona assim?
     */
    try {
      Comment.find({ idAnswer: { $in: id } }, function(err, collection) {
        if (err) throw err;
        res.json(collection);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find comments" + err });
    }
  },

  //Add Upvote
  commentUpvote(res, id) {
    try {
      Comment.findOneAndUpdate({ id: id }, { $inc: { upvotes: 1 } }, function(
        err,
        answer
      ) {
        if (err) throw err;
        console.log(answer);
        res.json({msg: "Upvote adicionado ao comentario", success: true})
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not upvote comment" + err });
    }
  },

  //Remove Upvote
  commentDownvote(res, id) {
    try {
      Comment.findOneAndUpdate({ id: id }, { $inc: { upvotes: -1 } }, function(
        err,
        answer  
      ) {
        if (err) throw err;
        console.log(answer);
        res.json({msg: "Upvote removido ao comentario", success: true})
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Could not downvote comment" + err });
    }
  },
  deleteComment(id) {
    try {
      Comment.findOneAndRemove({ id: id }, err => {
        if (err) throw err;
        console.log("Comment Removed");
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not delete comment" + err });
    }
  },
  updateUserInfo(user) {
    try {
      Comment.updateMany(
        { "userInfo.userid": user.userid },
        { userInfo: user },
        function(err, comment) {
          if (err) throw err;
          console.log(comment);
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not update comment" + err });
    }
  }
};

module.exports = crudComment;
