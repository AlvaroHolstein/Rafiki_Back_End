const { User } = require("../models/users.model");

let crudUser = {
  findAll(res) {
    User.find({}, (err, collection) => {
      if (err) {
        console.log(err, "erro");
      } else {
        console.log(collection, "collection");
        res.json(collection);
      }
    });
  },
  findByID(res, id) {
    User.findById(id, (err, collection) => {
      if (err) console.log(err);
      res.json(collection);
    });
  },
  findOneByName(res, name) {
    //Encontrar o user e devolve-lo
    User.find({ name: name }, (err, collection) => {
      if (err) {
        console.log(err, "erro no findOneByName()");
      } else {
        res.json(collection);
      }
    });
  },
  findOneByEmail(res, mail) {
    //Encontrar user e devolver-lo
    User.findOne({ email: mail }, (err, collection) => {
      if (err) {
        console.log(err, "Erro em findOneByEmail()");
      } else {
        res.json(collection);
      }
    });
  },
  updateUser(res, user) {
    //Encontrar user e atualizar
    //Deve vir um novo objecto user e faz se overwrite do user atual
    let query = { name: user.name };
    // let parsedUser = JSON.parse(user)
    // console.log(parsedUser)
    User.findOneAndUpdate(
      query,
      {
        $set: {
          name: user.name,
          id: user.id,
          follow: user.follow,
          upvotes: user.upvotes,
          notifications: user.notifications,
          password: user.password,
          email: user.email,
          experience: user.experience,
          picture: user.picture,
          year: user.year,
          course: user.course,
          description: user.description
        }
      },
      { useFindAndModify: false, new: true, overwrite: true },
      (err, collection) => {
        if (err) console.log(err);
        else {
          console.log(collection, "a collection");
          res.json(collection);
        }
      }
    );
    // console.log(a, 'a')
  },
  deleteUser(res, id) {
    // Encontrar user, eliminá-lo e devolver este user
  },
  insertUser(res, user) {
    User.find({ id: user.id }, (err, collection) => {
      if (err) console.log(err, "Erro ao procurar user antes de inserir");
      else {
        if (collection.length == 0) {
          let newUser = new User(user);
          newUser.save(err => {
            if (err) console.log(err, "erro ao guardar user");
            else {
              console.log(newUser, "User inserido com sucesso");
              res.json(newUser);
            }
          });
        } else {
          console.log("User já existe");
          res.json({ userExists: true });
        }
      }
    });
  }
};

module.exports = crudUser;
