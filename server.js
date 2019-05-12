const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const morgan = require('morgan')
require("dotenv").config();
const userController = require("./app/controllers/users.controller");
const badgeController = require("./app/controllers/badges.controller");
const threadController = require("./app/controllers/threads.controller");

//Auth
const authController = require("./app/controllers/auth/auth.controller");
const verifyToken = require("./app/controllers/auth/VerifyToken"); //middleware

const app = express();



app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[header]" ":res[header]"'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}))
app.use((req, res, next) => {
  console.log(req.headers, 'headers')
  next();
}, (req, res, next) => {
  console.log(req.session, 'mid2')
  next()
});
/**
 * Fazer rotas
 */

app.get("/", (req, res) => {
  res.send("Back End Rafiki");
});
//Authentication
app.post("/register", (req, res) => {
  authController.register(req, res);
});
app.post("/login", (req, res) => {
  authController.login(req, res);
});

app.get("/logout", verifyToken, (req, res) => {
  authController.logout(req, res);
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
app.put("/updateuser", verifyToken, (req, res) => {
  console.log(req.body.user, "/updateUser")
  res.send(req.userId)
  // userController.updateUser(res, req.body.user);
});
/* app.post("/adduser", (req, res) => {
  userController.insertUser(res, req.body.user);
}); */
/**
 * Thread paths
 */
app.get("/allthreads", (req, res) => {
  //Working
  threadController.findAll(res);
});

app.get("/findTag", (req, res) => {
  //Working
  threadController.findByTag(res, ["Vue.js", "JAVASCRIPT"]);
});
app.get("/findkeyword", (req, res) => {
  //Working
  threadController.findByKeyword(res, "TESTE");
});

app.post("/newThread", verifyToken, (req, res) => {
  //Working
  threadController.addThread(res, req.body.thread);
});

//badges.controller
app.get("/allbadges", (req, res) => {
  badgeController.findAll(res);
});

//Tag.controller
app.get("/allTags", (req, res) => {
  tagController.findAll(res);
});



module.exports = app;
