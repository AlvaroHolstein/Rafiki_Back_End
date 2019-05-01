const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const userController = require("./app/controllers/users.controller");
const badgeController = require("./app/controllers/badges.controller");
const threadController = require("./app/controllers/threads.controller");

const app = express();

const port = process.env.PORT || 80;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  // console.log(req.body)
  next();
});
/**
 * Fazer rotas
 */

app.get("/", (req, res) => {
  res.send("Back End Rafiki");
});

/**
 * User paths
 */
app.get("/allusers", (req, res) => {
  //Função criada no controller
  userController.findAll(res);
});

app.get("/userByName", (req, res) => {
  userController.findOneByName(res, req.body.name);
});
app.put("/updateuser", (req, res) => {
  // console.log(req.body.user, "/updateUser")
  userController.updateUser(res, req.body.user);
});
app.post("/adduser", (req, res) => {
  userController.insertUser(res, req.body.user);
});
/**
 * Thread paths
 */
app.get("/allthreads", (req, res) => {
  //Working
  threadController.findAll(res);
});

app.get("/findTag", (req, res) => {
  //Working
  threadController.findByTag(res, ["Vue.js"]);
});
app.get("/findkeyword", (req, res) => {
  //Check Later
  threadController.findByKeyword(res, "Thread");
});

app.post("/newThread", (req, res) => {
  //Working
  threadController.addThread(
    {
      id: 1,
      photo: "http://www.coffeebrain.org/wiki/images/9/93/PEOPLE-NoFoto.JPG",
      name: "admin",
      rank: "A começar"
    },
    "Thread de teste",
    "<p>Thread de teste</p>",
    [{ id: 1, text: "Vue.Js" }, { id: 2, text: "Javascript" }]
  );
});

app.get("/allbadges", (req, res) => {
  //badges.controller
  badgeController.findAll(res);
});

//Tag.controller
app.get("/allTags", (req, res) => {
  tagController.findAll(res);
});

app.listen(port, () => {
  console.log(`Server running on port :${port}`);
});

module.exports = app;
