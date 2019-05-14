const router = require('express').Router()

const userController = require("../controllers/users.controller");
const badgeController = require("../controllers/badges.controller");
const threadController = require("../controllers/threads.controller");

const verifyToken = require('../controllers/auth/VerifyToken')
router.get('/', function (req, res) {
    console.log(req)
    res.send('Route para as chamadas à base de dados.')
})
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

router.get("/users/userByName", (req, res) => {
    userController.findOneByName(res, req.body.name);
});
router.put("/users/updateuser", verifyToken, (req, res) => {
    console.log(req.body.user, "/updateUser")
    res.send(req.userId, 'req.userid')
    // userController.updateUser(res, req.body.user);
});
/* router.post("/adduser", (req, res) => {
  userController.insertUser(res, req.body.user);
}); */
/**
 * Thread paths
 */
router.get("/threads", (req, res) => {
    //Working
    threadController.findAll(res);
});
router.get("/threads/:id", (req, res) => {
    //Working
    threadController.findByID(res, req.params.id);
});


router.get("/threads/findTag", (req, res) => {
    //Working
    threadController.findByTag(res, ["Vue.js", "JAVASCRIPT"]);
});

router.get("/threads/findkeyword", (req, res) => {
    //Working
    threadController.findByKeyword(res, "TESTE");
});

router.post("/threads", verifyToken, (req, res) => {
    //Working
    threadController.addThread(res, req.body.thread);
});

//badges.controller
router.get("/badges", (req, res) => {
    badgeController.findAll(res);
});

//Tag.controller
router.get("/tags", (req, res) => {
    tagController.findAll(res);
});


module.exports = router