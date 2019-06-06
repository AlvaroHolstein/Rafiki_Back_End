const { User } = require("../models/users.model");
var nodemailer = require("nodemailer");

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
    //Vai ser assim que se vai fazer o update do follow e das notificações
    let query = { id: id };
    console.log(user, "Este é u user no updateUser !!!!!!!!!!!!!!!")
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
  updateUserNoEmail(res, id, user) {
    let query = { id: id };
    console.log(user, "Este é u user no updateUserNoEmail !!!!!!!!!!!!!!!")
    User.findOneAndUpdate(
      query,
      {
        $set: {
          // name: user.name,
          follow: user.follow,
          // upvotes: user.upvotes,
          // notifications: user.notifications,
          // experience: user.experience,
          // picture: user.picture,
          // year: user.year,
          // course: user.course,
          // description: user.description
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
  },
  deleteUser(res, id) {
    User.findOneAndRemove({ id: id }, (err, res) => {
      if (err) throw err;
      console.log("User Deleted");
    });
  },
  contact(req,res){
    if(req.body-email!==undefined){
      var emailAddres = req.body.email
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "rafikiteam18.19@gmail.com", //Mail
          pass: "Rafiki1234!" //Password
        }
      });
      var html= `<p>${req.body.name}</p>
                <p>${req.body.message}</p>
      `
      var options = {
        from:emailAddres,
        to:"rafikiteam18.19@gmail.com",
        subject:req.body.subject,
        html:html
      }
      transporter.sendMail(options,function(err,info){
        if(err){
          console.log(err)
          res.json({yo:"error"})
        }else{
          console.log("Message sent"+info.response)
          res.json({yo:info.response})
        }
      })
      res.send("<p>Mail Sent</p>")
    }else{
      res.send("Email address is missing")
    }
  }
};

module.exports = crudUser;
