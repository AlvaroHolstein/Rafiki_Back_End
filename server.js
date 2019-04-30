const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const userController = require("./app/controllers/users.controller");
const badgeController = require("./app/controllers/badges.controller");
const threadController = require("./app/controllers/threads.controller");
const tagController = require("./app/controllers/tags.controller");
const app = express();

const port = process.env.PORT || 80;

app.use(cors());
/**
 * Fazer rotas
 */

app.get("/", (req, res) => {
  res.send("Back End Rafiki");
});

app.get("/allusers", (req, res) => {
  //Função criada no controller
  userController.findAll(res);
});

app.get("/allbadges", (req, res) => {
  //badges.controller
  badgeController.findAll(res);
});
//Thread.controller
app.get("/allthreads", (req, res) => {
  threadController.findAll(res);
});
app.get("/findTag", (req, res) => {
  threadController.findByTag(res, ["Vue.js"]);
});
app.get("/findkeyword", (req, res) => {
  threadController.findByKeyword(res, "Thread");
});
//Tag.controller
app.get("/allTags", (req, res) => {
  tagController.findAll(res);
});

app.listen(port, () => {
  console.log(`Server running on port :${port}`);
});

module.exports = app;
