const { User, Notification } = require("../models/users.model");
var nodemailer = require("nodemailer");

let crudUser = {
  // registerUser(res, user) {
  //   User.create(user, (err, user) => {
  //     if (err) throw err
  //     res.json({ msg: "success", user: user })
  //   })
  // },
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
          // email: user.email, Por agora so se estaria a por o email a null
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
  addFollow(res, id, follow) {
    let query = { id: id };
    User.findOne(
      query,
      (err, user) => {
        if (err) throw err;
        /** Fazer push do id da thread a seguir pelo user */
        console.log(user.follow, "Array de followers do usaer " + user.name)
        /** Esta verificação só vai bser feita mesmo para despistar qualquer erro,´
         * porque esta verificação também vai ser feita no front-end
         */
        for (let i = 0; i < user.follow.length; i++) {
          if (user.follow[i] == follow) {
            res.json({ msg: "That thread is already being followed", success: false })
            return;
          }
        }
        user.follow.push(follow)
        user.save(err => {
          res.json({ msg: "success", success: true });
        })
      }
    );
  },
  removeFollow(res, id, follow) {
    User.findOne({ id: id }, (err, user) => {
      let existe = true
      if (err) throw err
      let index = user.follow.findIndex(fol => fol == follow)
      if (index != -1) user.follow.splice(index, 1);
      else existe = false
      user.save(err => {
        if (err) res.json({ msg: "Ocorreu um erro a gravar o user", success: false })
        res.json({ msg: existe ? "Success" : "O user não segue essa thread", success: true, user: user })
      })
    })
  },
  addExperience(res, id, exp) {
    User.findOneAndUpdate({ id: id }, { $inc: { experience: exp } }, (err, user) => {
      if (err) throw err;
      res.json({ msg: `foi adicionada ${exp} de exp ao user ${user.name}`, user: user, success: true })
    })
  },
  removeExperience(res, id, exp) {
    User.findOneAndUpdate({ id: id }, { $inc: { experience: -exp } }, (err, user) => {
      if (err) throw err;
      res.json({ mag: `foi removida ${exp} de exp ao user ${user.name}`, user: user, success: true })
    })
  },
  deleteUser(res, id) {
    User.findOneAndRemove({ id: id }, (err, resp) => {
      if (err) throw err;
      console.log("User Deleted");
      let success = true
      res.json({ success: success })
    });
  },
  contact(req, res) {
    if (req.body.email !== undefined) {
      var emailAddres = req.body.email
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "rafikiteam18.19@gmail.com", //Mail
          pass: "Rafiki1234!" //Password
        }
      });
      var html = `<p>${req.body.name}</p>
                <p>${req.body.message}</p>
      `
      var options = {
        from: emailAddres,
        to: "rafikiteam18.19@gmail.com",
        subject: req.body.subject,
        html: html
      }
      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err)
          res.json({ yo: "error" })
        } else {
          console.log("Message sent" + info.response)
          res.json({ yo: info.response })
        }
      })

      res.send(`<p>Mail Sent Subject:${req.body.subject}</p>`)
    } else {
      res.send("Email address is missing")
    }
  },
  addNotification(res, id, notification) {
    User.findOne({ id: id }, (err, user) => {
      Notification.create(notification, (err, noti) => {
        if(err) res.json({msg: "Algo correu mal", success: false})
        console.log(noti, "notiiiiiiiiiiiiii")
        user.notifications.push(noti)
        user.save(err => {
          if (err) throw err;
          res.json({ msg: `Notificação adicionada ao ${user.name}`, success: true })
        })
      })
    })
  }
  /** Fazer um para remover notificaçoes (boa cena para o user) */
};
module.exports = crudUser;




/*isBurnedUpv(res, id, upvote) {
  let burned = false
  User.findOne({ id: id }, (err, user) => {
    if (err) throw err;
    console.log(user.burnedUpvotes, "BURNNNNNNNNNNNNNN||!!!!!!!!!!!!")
    if (user.burnedUpvotes == undefined) user.burnedUpvotes = []
    for (let upv of user.burnedUpvotes) {
      if (upv.threadId == upvote.threadId && upv.answerId == upvote.answerId && upv.commentId == upvote.commentId && upv.userId == upvote.userId) {
        res.json({ msg: "Burned", isBurned: true })
        burned = true
        return
      }
    }
    if (!burned) {
      console.log(upvote)
      user.burnedUpvotes.push(upvote)
      User.findOneAndUpdate({ id: id }, { $set: { burnedUpvotes: user.burnedUpvotes } }, { useFindAndModify: false, overwrite: true },
        (err, newUser) => {
          if (err) throw err;
          res.json({ msg: "Not Burned", isBurned: false, userModi: newUser })
        })
    }
  })
},
isBurnedFollow(res, id, follow) {
  let burned = false
  User.findOne({ id: id }, (err, user) => {
    if (err) throw err;
    console.log(user.burnedFollow, "Burn FolloW!!!!!!!!!!!!!!!!!!!");
    if (user.burnedFollow == undefined) user.burnedFollow = []
    for (let fol of user.burnedFollow) {
      if (fol.userId == follow.userId && fol.threadId) {
        res.json({ msg: "Burned", isBurned: true })
        burned = true
        return;
      }
    }
    if (!burned) {
      console.log(follow)
      user.burnedFollow.push(follow)
      User.findOneAndUpdate({ id: id }, { $set: { burnedFollow: user.burnedFollow } }, { useFindAndModify: false, overwrite: true },
        (err, newUser) => {
          if (err) throw err;
          res.json({ msg: "Not Burned", isBurned: false, userModi: newUser })
        })
    }
  })
}*/


