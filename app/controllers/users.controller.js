const { User } = require("../models/users.model");

let crudUser = {
  findAll(res) {
    User.find({}, (err, collection) => {
      if (err) {
        console.log(err, "erro");
      } else {
        // console.log(collection, "collection");
        res.json(collection);
      }
    });
  },
  findByRank(res) {
    let users = [];
    User.find({}, (err, collection) => {
      if (err) {
        console.log(err, "ERRO");
      } else {
        users = collection.sort((a, b) => {
          if (a.experience > b.experience) return -1;
          if (a.experience < b.experience) return 1;
          else return 0;
        });
        console.log(collection, "collection");
        res.json(users);
      }
    });
  },
  findByID(res, id) {
    User.find({ id: id }, (err, collection) => {
      if (err) console.log(err);
      res.json(collection[0]);
    });
  },
  findOneByName(res, name) {
    //Encontrar o user e devolve-lo
    User.find({ name: { $regex: name, $options: "i" } }, (err, collection) => {
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
  updateUser(res, id, user) {
    //Encontrar user e atualizar
    //Deve vir um novo objecto user e faz se overwrite do user atual
    let query = { id: id };
    // let parsedUser = JSON.parse(user)
    // console.log(parsedUser)
    User.findOneAndUpdate(
      query,
      {
        $set: {
          name: user.name,
          follow: user.follow,
          upvotes: user.upvotes,
          notifications: user.notifications,
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
    User.findOneAndRemove({ id: id }, (err, resp) => {
      if (err) throw err;
      console.log("User Deleted");
      let success=true
      res.json({success: success})
    });
  }
};

module.exports = crudUser;
