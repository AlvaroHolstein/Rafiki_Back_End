const router = require("express").Router();

const userController = require("../controllers/users.controller");
const badgeController = require("../controllers/badges.controller");
const threadController = require("../controllers/threads.controller");
const answerController = require("../controllers/answers.controller");
const commentController = require("../controllers/comments.controller");
const tagController = require("../controllers/tags.controller");
const expLogController = require("../controllers/expLog.controller")
const statisticController = require("../controllers/statistics.controller");

const verifyToken = require("../controllers/auth/VerifyToken");
router.get("/", function (req, res) {
  // console.log(req);
  res.send("Route para as chamadas à base de dados.");
});
/**
 * User paths
 */
router.get("/users", (req, res) => {
  //Função criada no controller
  userController.findAll(res);
});
router.get("/users/:id", (req, res) => {
  //Função criada no controller
  userController.findByID(res, req.params.id);
});
router.get("/users/userByName/:name", (req, res) => {
  userController.findOneByName(res, req.params.name);
});
router.get("/users/userByEmail/:email", (req, res) => {
  userController.findOneByEmail(res, req.params.email);
});
router.get("/users/userByRank/rankings", (req, res) => {
  userController.findByRank(res);
});

/** Rotas para a página ViewProfile,
  * Meter o veifyToken em todas estas rotas (em principio),
  * 
  */
router.put("/users/addupvote/:id", (req, res) => {
  userController.addUpvote(res, req.params.id, req.body.upvote)
})  
router.put("/users/removeupvote/:id", (req, res) => {
  userController.removeUpvote(res, req.params.id, req.body.upvote)
})
router.put("/users/addfollow/:id", (req, res) => {
  userController.addFollow(res, req.params.id, req.body.follow);
});
router.put("/users/removefollow/:id", (req, res) => {
  userController.removeFollow(res, req.params.id, req.body.follow)
})
router.put("/users/addexp/:id", verifyToken, (req, res) => {
  userController.addExperience(res, req.params.id, req.body.exp)
})
router.put("/users/rmexp/:id", verifyToken, (req, res) => {
  userController.removeExperience(res, req.params.id, req.body.exp)
})
router.put("/users/addnotification/:id", verifyToken, (req, res) => {
  userController.addNotification(res, req.params.id, req.body.notification)
})
/** Fim das rotas para a página ViewProfile
 *  (pelo menos)
 */

 router.put("/users/:id", verifyToken, (req, res) => {
  console.log(req.body.user);
  userController.updateUser(res, req.params.id, req.body.user);
});
router.delete("/users/:id", verifyToken, (req, res) => {
  userController.deleteUser(res, req.params.id);
});

//Contact Form
router.post("/contact", (req, res) => {
  userController.contact(req, res)
})
/**
 * Thread paths
 */
router.get("/threads", (req, res) => {
  //Working
  threadController.findAll(req, res);
});

router.get("/threads/findTag", (req, res) => {
  //Working
  console.log("QUERYYY", req.query);
  threadController.findByTag(res, req.query.tags);
});
router.get("/threads/findkeyword", (req, res) => {
  //Working
  threadController.findByKeyword(res, req.query.keyword);
});
//Get all threads from a user
router.get("/threads/userThreads/:id", (req, res) => {
  //Working
  threadController.findByUserId(res, req.params.id);
});
router.post("/threads", verifyToken, (req, res) => {
  //Working
  threadController.addThread(res, req.body.thread);
});

router.post("/threads/findAndExclude", (req, res) => {
  //
  threadController.findAndExclude(req, res);
});

//Get Threads
router.get("/threads/:id", (req, res) => {
  //Working
  threadController.findByID(res, req.params.id);
}); //Get Thread By ID

router.put("/threads", (req, res) => {
  threadController.updateUserInfo(req.body.user);
});
router.put("/threads/:id/follow", (req, res) => {
  threadController.follow(res, req.params.id);
});
router.put("/threads/:id/unfollow", (req, res) => {
  threadController.unfollow(res, req.params.id);
});
router.put("/threads/:id/close", verifyToken, (req, res) => {
  threadController.closeDate(res, req.params.id);
});
router.put("/threads/:id/view", (req, res) => {
  threadController.addView(req.params.id);
});

router.put("/threads/:id/upvote", verifyToken, (req, res) => {
  threadController.addUpvote(res, req.params.id);
});
router.put("/threads/:id/downvote", verifyToken, (req, res) => {
  threadController.removeUpvote(res, req.params.id);
});

router.delete("/threads/:id", verifyToken, (req, res) => {
  threadController.deleteThread(res, req.params.id);
});

/*Answers Controller */
//Encontrar todas as answers de um user
router.get("/userAnswers/:id", (req, res) => {
  answerController.findByUserId(res, req.params.id);
});
//Add Answer
router.post("/threads/:id/answers", verifyToken, (req, res) => {
  answerController.addAnswer(res, req.params.id, req.body.answer);
});
router.get("/threads/:id/answers", (req, res) => {
  answerController.findAnswers(res, req.params.id);
  console.log(req.params.id);
}); //Get Answers

router.put("/threads/:id/answers/:idAnswer/upvote", verifyToken, (req, res) => {
  answerController.answerUpvote(res, req.params.idAnswer);
});
router.put("/threads/:id/answers/:idAnswer/downvote",
  verifyToken,
  (req, res) => {
    answerController.answerDownvote(res, req.params.idAnswer);
  }
);
router.delete("/threads/:id/answers/:idAnswer", verifyToken, (req, res) => {
  answerController.deleteAnswer(req.params.idAnswer);
});

router.put("/answers/update", (req, res) => {
  answerController.updateUserInfo(req.body.user);
});

/*Comments Controller */
//Encontrar todos os comments de um user
router.get("/userComments/:id", (req, res) => {
  commentController.findUserComments(res, req.params.id);
});
router.post(
  "/threads/:id/answers/:idAnswer/comments",
  verifyToken,
  (req, res) => {
    commentController.addComment(res, req.params.idAnswer, req.body.comment);
  }
); //Add Comment

router.get("/threads/:id/answers/:idAnswer/comments", (req, res) => {
  commentController.findComments(res, req.params.idAnswer);
  console.log(req.params.idAnswer);
}); //Get Comments
router.put(
  "/threads/:id/answers/:idAnswer/comments/:idComment/upvote",
  verifyToken,
  (req, res) => {
    commentController.commentUpvote(req.params.idComment);
  }
);
router.put(
  "/threads/:id/answers/:idAnswer/comments/:idComment/downvote",
  verifyToken,
  (req, res) => {
    commentController.commentDownvote(req.params.idComment);
  }
);

router.delete(
  "/threads/:id/answers/:idAnswer/comments/:idComment",
  verifyToken,
  (req, res) => {
    commentController.deleteComment(req.params.idComment);
  }
);
router.put("/comments/update", (req, res) => {
  commentController.updateUserInfo(req.body.user);
});

//badges.controller
router.get("/badges", (req, res) => {
  badgeController.findAll(res);
});
router.post("/badges", verifyToken, (req, res) => {
  badgeController.addBadge(
    res,
    req.body.name,
    req.body.goal,
    req.body.desc,
    req.body.category
  );
});
router.delete("/badges/:id", verifyToken, (req, res) => {
  badgeController.deleteBadge(res, req.params.id);
});

//Tag.controller
router.get("/tags", (req, res) => {
  tagController.findAll(res);
});

router.post("/tags", (req, res) => {
  tagController.addTag(res, req.body.text);
});

router.delete("/tags/:id", verifyToken, (req, res) => {
  tagController.deleteTag(res, req.params.id);
});

//Statistics controller

//GetAvgUpvotes
router.get("/avgupvotes", (req, res) => {
  statisticController.GetAvgUpvotes(res);
});
//GetUserUpvotes
router.get("/userupvotes/:id", (req, res) => {
  statisticController.GetUserUpvotes(res, req.params.id);
});
//GetAvgNumberOfThreads
router.get("/avgThreads", (req, res) => {
  statisticController.GetAvgNumberOfThreads(res);
});
//GetUserNumberOfThreads
router.get("/userNumberThreads/:id", (req, res) => {
  statisticController.GetUserNumberOfThreads(res, req.params.id);
});
//GetAvgLevel
router.get("/avgLevel", (req, res) => {
  statisticController.GetAvgLevel(res);
});
//GetUserLevel
router.get("/userLevel/:id", (req, res) => {
  statisticController.GetUserLevel(res, req.params.id);
});
//GetAvgNumberOfAnswers
router.get("/avgAnswers", (req, res) => {
  statisticController.GetAvgNumberOfAnswers(res);
});
//GetUserNumberOfAnswers
router.get("/userNumberAnswers/:id", (req, res) => {
  statisticController.GetUserNumberOfComments(res, req.params.id);
});
//GetAvgNumberOfComments
router.get("/avgcomments", (req, res) => {
  statisticController.GetAvgNumberOfComments(res);
});
//GetUserNumberOfComments
router.get("/userNumberComments/:id", (req, res) => {
  statisticController.GetUserNumberOfComments(res, req.params.id);
});
//HotTopics
router.get("/hotTopics", (req, res) => {
  statisticController.GetHotTopics(res);
});

//MostViewed
router.get("/mostViewed", (req, res) => {
  statisticController.mostViewed(res);
});
//Experience distribution
router.get("/exp", (req, res) => {
  statisticController.expDistribution(res);
});
//Top Commentators
router.get("/topCommentators", (req, res) => {
  statisticController.topCommentator(res);
});

/* ExpLog */
router.post("/explog/add", verifyToken, (req, res) => {
  expLogController.add(res, req.body.expLog)
})
router.post("/explog/remove/:id", verifyToken, (req, res) => {
  expLogController.remove(res, req.params.id)
})
module.exports = router;
