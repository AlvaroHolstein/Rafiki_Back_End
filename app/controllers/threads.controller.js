const { Thread } = require("../models/threads.model");
const moment = require("moment");
// const queryString = require("querystring")
const url = require("url");

/**
 * Devolver sempre as threads ordenadas
 * da mais recente para a mais antiga
 */
function orderByDate(arr) {
  // [year, month, day, hour, minute, second, millisecond]

  // console.log(moment([2019, 1, 10]).unix(), 'MAIOR')
  // console.log(moment([2019, 1, 1]).unix(), "MENOR")

  if (arr.length > 1) {
    return arr.sort((a, b) => {
      /** Data transformada para milisegundos para comparar */
      let timeA = moment(a.date).unix();
      let timeB = moment(b.date).unix();

      console.log(timeA, "TIME _ A");
      console.log(timeB, "TIME _ B");

      if (timeA < timeB) return 1;
      if (timeA > timeB) return -1;
    });
  } else return arr;
}

let crudThread = {
  //Add Thread
  addThread(res, thread) {
    try {
      let id = 1;

      let threads = [];

      Thread.find({}, (err, collection) => {
        if (err) throw err;
        threads = collection;
        if (threads.length != 0) {
          threads.sort(function(a, b) {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
          });
          id = threads[threads.length - 1].id + 1;
        }
        let newThread = Thread({
          id: id,
          userInfo: {
            userid: thread.user.userid,
            photo: thread.user.photo,
            name: thread.user.name,
            rank: thread.user.rank
          },
          title: thread.title,
          question: thread.question,
          tags: thread.tags,
          upvotes: 0,
          date: new Date(),
          views: 0
        });
        newThread.save(function(err) {
          if (err) throw err;
          console.log("Thread Added");
          res.json(newThread);
        });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not add thread" + err });
    }
  },

  //Get all Threads
  findAll(req, res) {
    try {
      let qty = url.parse(req.url, true).query.qty;
      console.log(qty, "QUANTIDADE");

      Thread.find({}, (err, collection) => {
        if (err) {
          console.log(err, "Error");
        } else {
          let ordered = orderByDate(collection);
          console.log(ordered, "Ordered");

          if (qty != undefined) {
            let aux = [];
            for (let i = 0; i < qty; i++) {
              if (ordered[i] != undefined) aux.push(ordered[i]);
            }
            res.json(aux);
          } else res.json(ordered);
        }
      });
    } catch (err) {
      return res.status(400).send({ error: "Could notfind threads" + err });
    }
  },
  //Get some Threads and excluding others
  findAndExclude(req, res) {
    try {
      console.log(req.body, "Body no FIND AND EXCLUDE");
      Thread.find(
        { id: { $not: { $in: req.body.exclude } } },
        (err, collection) => {
          if (err) console.log(err, "errr");
          else {
            let ordered = orderByDate(collection);
            if (req.body.qty != undefined) {
              console.log("Quantidade 'selecionada' FIND AND EXCLUDE");
              res.json(
                ordered.filter((thread, cont) => {
                  if (cont + 1 <= req.body.qty) {
                    return true;
                  }
                })
              );
            } else {
              console.log(
                `Envio de ${ordered.length} threads FIND AND EXCLUDE`
              );
              res.json(ordered);
            }
          }
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not find threads" + err });
    }
  },
  //Get Single Thread
  findByID(res, id) {
    try {
      Thread.find({ id: id }, (err, collection) => {
        if (err) console.log(err);
        res.json(collection[0]);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find threads" + err });
    }
  },
  findByUserId(res, id) {
    try {
      Thread.find({ "userInfo.userid": id }, (err, collection) => {
        if (err) console.log(err);
        res.json(collection);
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find threads" + err });
    }
  },
  //Get Thread By Tags
  findByTag(res, tags) {
    try {
      //tags is an array of String
      let threads = [];
      tags = tags.split(",");
      console.log(tags);
      Thread.find({}, (err, collection) => {
        if (err) {
          console.log(err, "Error");
        } else {
          threads = collection;
          console.log("DA???", threads[0].tags[0].text);
          for (let i = 0; i < tags.length; i++) {
            tags[i] = tags[i].replace(/"/g, "");
            threads = threads.filter(thread => {
              for (let j = 0; j < thread.tags.length; j++)
                if (
                  thread.tags[j].text.toLowerCase() == tags[i].toLowerCase()
                ) {
                  return true;
                } else {
                  console.log(
                    "Não Da?",
                    tags[i].toLowerCase(),
                    thread.tags[j].text.toLowerCase()
                  );
                }
            });
          }
          console.log(threads);
          let ordered = orderByDate(threads);
          res.json(ordered);
        }
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find threads" + err });
    }
  },

  //Get Thread By keyword
  findByKeyword(res, keyword) {
    try {
      keyword = keyword.replace(/"/g, "");
      Thread.find(
        {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { question: { $regex: keyword, $options: "i" } }
          ]
        },
        (err, collection) => {
          if (err) throw err;
          let ordered = orderByDate(collection);
          res.json(collection);
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not find threads" + err });
    }
  },

  //Mudar Informação do user
  updateUserInfo(user) {
    try {
      Thread.updateMany(
        { "userInfo.userid": user.userid },
        { userInfo: user },
        function(err, thread) {
          if (err) throw err;
          console.log(thread);
          // res.json({msg: "success", data: thread})
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not update threads" + err });
    }
  },
  //Close Thread
  closeDate(res, id) {
    try {
      Thread.findOneAndUpdate({ id: id }, { closeDate: new Date() }, function(
        err,
        thread
      ) {
        if (err) throw err;
        console.log(thread);
        res.json({ msg: "success", data: thread });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not close thread" + err });
    }
  },
  //Add View
  addView(res, id) {
    try {
      Thread.findOneAndUpdate({ id: id }, { $inc: { views: 1 } }, function(
        err,
        thread
      ) {
        if (err) throw err;
        console.log(thread);
        res.json({msg: "success", data: thread, success: true})
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not update threads" + err });
    }
  },
  //Delete Thread
  deleteThread(res, id) {
    Thread.findOneAndRemove({ id: id }, function (err, thread) {
      if (err) throw err;
      console.log("Thread Deleted");
      res.json({ msg: "success", data: thread })
    });
  },
  /** Controllers para a página ViewProfile */
  //Add Upvote
  addUpvote(res, id) {
    try {
      Thread.findOneAndUpdate({ id: id }, { $inc: { upvotes: 1 } }, function(
        err,
        thread
      ) {
        if (err) throw err;
        console.log(thread);
        res.json({msg: "success", data: thread, success: true})
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not update threads" + err });
    }
  },
  //Remove Upvote
  removeUpvote(res, id) {
    try {
      Thread.findOneAndUpdate({ id: id }, { $inc: { upvotes: -1 } }, function(
        err,
        thread
      ) {
        if (err) throw err;
        console.log(thread);
        res.json({msg: "success", data: thread, success: true})
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not update threads" + err });
    }
  },
  //Delete Thread
  deleteThread(res, id) {
    try {
      Thread.findOneAndRemove({ id: id }, function(err, thread) {
        if (err) throw err;
        console.log("Thread Deleted");
        res.json({ msg: "success", data: thread });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not update threads" + err });
    }
  },
  follow(res, id) {
    try {
      Thread.findOneAndUpdate(
        { id: id },
        { $inc: { follow: 1 } },
        (err, thread) => {
          if (err)
            res.json({
              msg: "Erro ao incrementar follow",
              success: false
            }); /** Aqui fica res.json para mandar o erro, ou é melhor (throw err)????? */
          console.log("Add follow");
          res.json({ msg: "success", success: true, thread: thread });
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not update threads" + err });
    }
  },
  unfollow(res, id) {
    try {
      Thread.findOneAndUpdate(
        { id: id },
        { $inc: { follow: -1 } },
        (err, thread) => {
          if (err) throw err;
          console.log("Remove follow");
          res.json({ msg: "success", thread: thread, success: true });
        }
      );
    } catch (err) {
      return res.status(400).send({ error: "Could not update threads" + err });
    }
  }
};
module.exports = crudThread;
