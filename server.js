const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const dataRoute = require('./app/routes/data.route')
const authenticationRoute = require('./app/routes/authentication.route')

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[header]" ":res[header]"'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.set('trust proxy', '1'); Ques esto ???????? 

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: { 
  //   secure: true
  // }, como estamos numa ligação http não vale a pena ter isto visto que só funciona por https
}))

app.use((req, res, next) => {
  console.log(req.headers, 'headers')
  next();
}, (req, res, next) => {
  console.log(req.session, 'mid2')
  next()
});

app.get("/", (req, res) => {
  res.send("Back End Rafiki");
});

/**
 * Route para as chamadas de autenticação
 */
app.use('/auth-api', authenticationRoute)

/**
 * Route para as chamdas à base de dados
 */
app.use('/data-api', dataRoute)

module.exports = app;
