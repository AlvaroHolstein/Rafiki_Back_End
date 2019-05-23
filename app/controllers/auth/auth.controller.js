const { User } = require("../../models/users.model");
const secret = process.env.SECRET;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
let Auth = {
  //Register
  register(req, res) {
    let id = 1;

    //Verificar se ja existe depois de testar
    User.find({}, (err, collection) => {
      if (err) throw err;
      if (collection.length != 0) {
        collection.sort(function(a, b) {
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
              function(err, user) {
                if (err)
                  return res
                    .status(500)
                    .send("There was a problem registering the user.");
                // create a token
                var token = jwt.sign({ id: user._id }, secret, {
                  expiresIn: "1h" // expires in 1 hour
                });
                res.status(200).send({ auth: true, token: token });
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
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) return res.status(500).send("Error on the server.");
      if (!user) return res.status(404).send("No user found.");
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, secret, {
        expiresIn: "1h" // expires in 1 hour
      });
      res.cookie("se_la_cookie", "lelele", {
        maxAge: 90000,
        httpOnly: false,
        secure: false
      });
      res.status(200).send({ auth: true, token: token, id: user.id });
    });
  },
  //logout
  logout(req, res) {
    res.status(200).send({ auth: false, token: null });
  },
  passwordreset(req, res) {
    if (req.body.email !== undefined) {
      var emailAddress = req.body.email;

      User.findOne({ email: emailAddress }, function(err, user) {
        if (err) return res.status(500).send("Error on the server");
        if (!user) return res.status(404).send("No user with this email");
        var payload = {
          id: user.id,
          email: user.email
        };
        var secret = process.env.SECRET + user.password;

        var token = jwt.sign(payload, secret);

        // TODO: Send email containing link to reset password.
        // In our case, will just return a link to click.
        res.send(
          '<a href="/auth-api/resetpassword/' +
            user.id +
            "/" +
            token +
            '">Reset password</a>'
        );
      });
    } else {
      res.send("Email address is missing.");
    }
  },
  resetpassword(req, res) {
    // TODO: Fetch user from database using
    // req.params.id
    // TODO: Decrypt one-time-use token using the user's
    // current password hash from the database and combine it
    // with the user's created date to make a very unique secret key!
    // For example,
    // var secret = user.password + ‘-' + user.created.getTime();
    User.find({ id: req.params.id }, (err, user) => {
      if (err) throw err;
      var secret = process.env.SECRET + user.password;
      var payload = jwt.decode(req.params.token, secret);
      // TODO: Gracefully handle decoding issues.
      // Create form to reset password.
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
    // TODO: Fetch user from database using
    // req.body.id
    // TODO: Decrypt one-time-use token using the user's
    // current password hash from the database and combining it
    // with the user's created date to make a very unique secret key!
    // For example,
    // var secret = user.password + ‘-' + user.created.getTime();
    User.find({ id: req.body.id }, (err, user) => {
      if (err) throw err;
      var secret = process.env.SECRET + user.password;

      var payload = jwt.decode(req.body.token, secret);
      console.log(payload);

      // TODO: Gracefully handle decoding issues.
      // TODO: Hash password from
      // req.body.password
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      User.findOneAndUpdate(
        { id: req.body.id },
        { password: hashedPassword },
        function(err, user) {
          if (err) throw err;
          console.log(user);
        }
      );
      res.send("Your password has been successfully changed.");
    });
  }
};

module.exports = Auth;
