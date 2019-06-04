const { Comment } = require("../models/comments.model");

let crudComment = {
  //Add Comment
  addComment(res, idAnswer, comment) {
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
  },
  findUserComments(res, id) {
    Comment.find({ "userInfo.userid": id }, (err, collection) => {
      if (err) console.log(err, "Erro no findUserComments");
      res.json(collection);
    });
  },
  //Get Comment By Answer ID
  findComments(res, id) {
    /**
     * O id também vai ser um array // Será que funciona assim?
     */
    Comment.find({ idAnswer: { $in: id } }, function(err, collection) {
      if (err) throw err;
      res.json(collection);
    });
  },

  //Add Upvote
  commentUpvote(id) {
    Comment.findOneAndUpdate({ id: id }, { $inc: { upvotes: 1 } }, function(
      err,
      answer
    ) {
      if (err) throw err;
      console.log(answer);
    });
  },

  //Remove Upvote
  commentDownvote(id) {
    Comment.findOneAndUpdate({ id: id }, { $inc: { upvotes: -1 } }, function(
      err,
      answer
    ) {
      if (err) throw err;
      console.log(answer);
    });
  },
  deleteComment(id) {
    Comment.findOneAndRemove({ id: id }, err => {
      if (err) throw err;
      console.log("Comment Removed");
    });
  },
  updateUserInfo(user) {
    Comment.updateMany(
      { "userInfo.userid": user.userid },
      { userInfo: user },
      function(err, comment) {
        if (err) throw err;
        console.log(comment);
      }
    );
  },
};

module.exports = crudComment;
