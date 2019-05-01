const { Comment } = require("../models/comments.model");

let crudComment = {
  //Add Comment
  addComment(idAnswer, idUser, comment) {
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

      let newComment = Answer({
        id: id,
        idAnswer: idAnswer,
        idUser: idUser,
        comment: comment
      });

      newComment.save(function(err) {
        if (err) throw err;
        console.log("Comment Added");
      });
    });
  },

  //Get Comment By Answer ID
  findComments(res, id) {
    Comment.find({ idAnswer: id }, function(err, collection) {
      if (err) throw err;
      res.json(collection);
    });
  },

  //Add Upvote
  commentUpvote(id) {
    Comment.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, function(
      err,
      answer
    ) {
      if (err) throw err;
      console.log(answer);
    });
  },

  //Remove Upvote
  commentDownvote(id) {
    Comment.findByIdAndUpdate(id, { $inc: { upvotes: -1 } }, function(
      err,
      answer
    ) {
      if (err) throw err;
      console.log(answer);
    });
  }
};

module.exports = crudComment;
