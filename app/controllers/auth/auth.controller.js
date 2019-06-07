const { User } = require("../../models/users.model");
const secret = process.env.SECRET;
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
let Auth = {
  //Register
  register(req, res) {
    let id = 1;

    //Verificar se ja existe depois de testar
    User.find({}, (err, collection) => {
      if (err) throw err;
      if (collection.length != 0) {
        collection.sort(function (a, b) {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
        });
        id = collection[collection.length - 1].id + 1;
        console.log(req.body, "req.body");
      }

      if (
        req.body.name != undefined &&
        !collection.some(user => user.name === req.body.name)
      ) {
        if (
          req.body.email != undefined &&
          !collection.some(user => user.email === req.body.email)
        ) {
          if (req.body.password != undefined && req.body.password != "") {
            var hashedPassword = bcrypt.hashSync(req.body.password, 8);
            //REgister
            User.create(
              {
                id: id,
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
              },
              function (err, user) {
                if (err)
                  return res
                    .status(500)
                    .send("There was a problem registering the user.");
                // create a token
                var token = jwt.sign({ id: user._id }, secret, {
                  expiresIn: "1h" // expires in 1 hour
                });
                res.cookie("login", token, { maxAge: 9999 });
                res
                  .status(200)
                  .send({
                    auth: true,
                    token: token,
                    id: user.id,
                    cookie: "login"
                  });
              }
            );
          } else res.send("Password Inválida");
        } else res.send("email inválido");
      } else {
        res.send("Name Already Exists");
      }
    });
  },
  //login
  login(req, res) {
    console.log(req.body, "req.body no login");
    //Encontrar o User
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send("Error on the server.");
      if (!user) return res.status(404).send("No user found.");

      //Comparar Passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        //Caso a password não seja válida
        return res.status(401).send({ auth: false, token: null });
      }

      // Caso a password seja válida
      var token = jwt.sign({ id: user._id }, secret, {
        expiresIn: "1h" // expires in 1 hour
      });
      let sendUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        notifications: user.notifications,
        experience: user.experience,
        picture: user.picture,
        follow: user.follow,
        course: user.course,
        year: user.year,
        upvotes: user.upvotes
      }
      res.cookie("login", token, { maxAge: 9999 });
      res
        .status(200)
        .send({ auth: true, token: token, id: user.id, cookie: "login", user: sendUser });

      //res.send("Cookie??");
    });
  },
  //logout
  logout(req, res) {
    res.clearCookie("login");
    res.status(200).send({ auth: false, token: null });
  },
  passwordreset(req, res) {
    if (req.body.email !== undefined) {
      var emailAddress = req.body.email;

      User.findOne({ email: emailAddress }, function (err, user) {
        if (err) return res.status(500).send("Error on the server");
        if (!user) return res.status(404).send("No user with this email");
        var payload = {
          id: user.id,
          email: user.email
        };
        var secret = process.env.SECRET + user.password;

        var token = jwt.sign(payload, secret);

        var transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "rafikiteam18.19@gmail.com", //Mail
            pass: "Rafiki1234!" //Password
          }
        });
        var html =
          "<p>Hello " +
          user.name +
          "</p>" +
          '<p><a href="http://127.0.0.1:420/auth-api/resetpassword/' +
          user.id +
          "/" +
          token +
          '">Reset password</a></p>';

        var options = {
          from: "rafikiteam18.19@gmail.com",
          to: user.email,
          subject: "Password Recovery",
          html: html
        };

        transporter.sendMail(options, function (err, info) {
          if (err) {
            console.log(err);
            res.json({ yo: "error" });
          } else {
            console.log("Message sent" + info.response);
            res.json({ yo: info.response });
          }
        });
        res.send("<p>Mail Sent</p>");
      });
    } else {
      res.send("Email address is missing.");
    }
  },
  resetpassword(req, res) {
    User.find({ id: req.params.id }, (err, user) => {
      if (err) throw err;
      var secret = process.env.SECRET + user.password;
      var payload = jwt.decode(req.params.token, secret);

      res.send(
        '<form action="/auth-api/resetpassword" method="POST">' +
        '<input type="hidden" name="id" value="' +
        payload.id +
        '" />' +
        '<input type="hidden" name="token" value="' +
        req.params.token +
        '" />' +
        '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
        '<input type="submit" value="Reset Password" />' +
        "</form>"
      );
    });
  },
  changepassword(req, res) {
    console.log(req.body);

    User.find({ id: req.body.id }, (err, user) => {
      if (err) throw err;
      var secret = process.env.SECRET + user.password;

      var payload = jwt.decode(req.body.token, secret);
      console.log(payload);

      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      User.findOneAndUpdate(
        { id: req.body.id },
        { password: hashedPassword },
        function (err, user) {
          if (err) throw err;
          console.log(user);
        }
      );
      res.send("Your password has been successfully changed.");
    });
  },
  keepLogged(req, res) {

    User.findById(req.userId, (err, user) => {
      if(err) throw err
      
      console.log(user, "user no keepLogged controller")
      if(user) {
        res.json({auth: true, userId: user.id})
      }
    })
  }
};

module.exports = Auth;
