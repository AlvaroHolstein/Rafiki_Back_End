const router = require('express').Router()

router.get('/', function (req, res) {
    console.log(req)
    res.send('Route para as chamadas à base de dados.')
})
/**
 * User paths
 */
router.get("/allusers", (req, res) => {
    //Função criada no controller
    userController.findAll(res);
});

router.get("/userByName", (req, res) => {
    userController.findOneByName(res, req.body.name);
});
router.put("/updateuser", (req, res) => {
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
router.get("/allthreads", (req, res) => {
    //Working
    threadController.findAll(res);
});

router.get("/findTag", (req, res) => {
    //Working
    threadController.findByTag(res, ["Vue.js", "JAVASCRIPT"]);
});

router.get("/findkeyword", (req, res) => {
    //Working
    threadController.findByKeyword(res, "TESTE");
});

router.post("/newThread", (req, res) => {
    //Working
    threadController.addThread(res, req.body.thread);
});

//badges.controller
router.get("/allbadges", (req, res) => {
    badgeController.findAll(res);
});

//Tag.controller
router.get("/allTags", (req, res) => {
    tagController.findAll(res);
});


module.exports = router