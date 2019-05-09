const { User } = require("../../models/users.model");
const secret = process.env.SECRET;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
let Auth = {
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
      }

      if (!collection.some(user => user.name === req.body.name)) {
        if (!collection.some(user => user.email === req.body.email)) {
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
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({ auth: true, token: token });
            }
          );
        }
      }
    });
  }
};

module.exports = Auth;