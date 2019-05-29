const router = require("express").Router();

const userController = require("../controllers/users.controller");
const badgeController = require("../controllers/badges.controller");
const threadController = require("../controllers/threads.controller");
const answerController = require("../controllers/answers.controller");
const commentController = require("../controllers/comments.controller");
const tagController = require("../controllers/tags.controller");

const statisticController = require("../controllers/statistics.controller");

const verifyToken = require("../controllers/auth/VerifyToken");
router.get("/", function(req, res) {
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

router.put("/users/:id", verifyToken, (req, res) => {
  console.log(req.body.user);
  userController.updateUser(res, req.params.id, req.body.user);
});
router.delete("/users/:id", verifyToken, (req, res) => {
  userController.deleteUser(res, req.params.id);
});
/**
 * Thread paths
 */
router.get("/threads", (req, res) => {
  //Working
  threadController.findAll(req, res);
});
router.get("/threads/findTag", (req, res) => {
  //Working
  threadController.findByTag(res, ["Vue.js", "JAVASCRIPT"]);
});
router.get("/threads/findkeyword", (req, res) => {
  //Working
  threadController.findByKeyword(res, "TESTE");
});
//Get all threads from a user
router.get("/threads/userThreads/:id", (req, res) => {
  //Working
  threadController.findByUserId(res, req.params.id);
});

//Get Threads
router.get("/threads/:id", (req, res) => {
  //Working
  threadController.findByID(res, req.params.id);
}); //Get Thread By ID

router.get("/threads/:id/answers", (req, res) => {
  answerController.findAnswers(res, req.params.id);
  console.log(req.params.id);
}); //Get Answers
router.get("/threads/:id/answers/:idAnswer/comments", (req, res) => {
  commentController.findComments(res, req.params.idAnswer);
  console.log(req.params.idAnswer);
}); //Get Comments

router.post("/threads", verifyToken, (req, res) => {
  //Working
  threadController.addThread(res, req.body.thread);
});

router.post("/threads/findAndExclude", (req, res) => {
  //
  threadController.findAndExclude(req, res);
});

//Add Thread
router.post("/threads/:id/answers", (req, res) => {
  answerController.addAnswer(res, req.params.id, req.body.answer);
}); //Add Answer

router.post("/threads/:id/answers/:idAnswer/comments", (req, res) => {
  commentController.addComment(res, req.params.idAnswer, req.body.comment);
}); //Add Comment

/*Answers Controller */
//Encontrar todas as answers de um user
router.get("/userAnswers/:id", (req, res) => {
  answerController.findByUserId(res, req.params.id);
});

/*Comments Controller */
//Encontrar todos os comments de um user
router.get("/userComments/:id", (req, res) => {
  commentController.findUserComments(res, req.params.id);
});

//badges.controller
router.get("/badges", (req, res) => {
  badgeController.findAll(res);
});
router.post("/badges", verifyToken, (req, res) => {
  badgeController.addBadge(
    req.body.name,
    req.body.goal,
    req.body.desc,
    req.body.category
  );
});
router.delete("/badges/:id", verifyToken, (req, res) => {
  badgeController.deleteBadge(req.params.id);
});

//Tag.controller
router.get("/tags", (req, res) => {
  tagController.findAll(res);
});

router.post("/tags", (req, res) => {
  tagController.addTag(req.body.text);
});

router.delete("/tags/:id", verifyToken, (req, res) => {
  tagController.deleteTag(req.params.id);
});

//Rotas para estatisticas

//GetAvgUpvotes

//GetUserUpvotes

//GetAvgNumberOfThreads
router.get("/avgThreads", (req, res) => {
  statisticController.GetAvgNumberOfThreads(res);
});
//GetUserNumberOfThreads

//GetAvgLevel
router.get("/avgLevel", (req, res) => {
  statisticController.GetAvgLevel(res);
});
//GetUserLevel

//GetAvgNumberOfComments (comments+answers)

//GetUserNumberOfComments

module.exports = router;
