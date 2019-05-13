const { Thread } = require("../models/threads.model");

let crudThread = {
  //Add Thread
  addThread(res, thread) {
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
          userid: thread.user.id,
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
  },

  //Get all Threads
  findAll(res) {
    Thread.find({}, (err, collection) => {
      if (err) {
        console.log(err, "Error");
      } else {
        res.json(collection);
      }
    });
  },

  //Get Single Thread
  findByID(res, id) {
    Thread.findById(id, (err, collection) => {
      if (err) console.log(err);
      res.json(collection);
    });
  },
  //Get Thread By Tags
  findByTag(res, tags) {
    //tags is an array of String
    let threads = [];

    Thread.find({}, (err, collection) => {
      if (err) {
        console.log(err, "Error");
      } else {
        threads = collection;
        console.log(threads[0].tags[0].text);
        for (let i = 0; i < tags.length; i++) {
          threads = threads.filter(thread => {
            for (let j = 0; j < thread.tags.length; j++)
              if (thread.tags[j].text.toLowerCase() == tags[i].toLowerCase()) {
                return true;
              }
          });
        }
        console.log(threads);
        res.json(threads);
      }
    });
  },

  //Get Thread By keyword
  findByKeyword(res, keyword) {
    Thread.find(
      {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { question: { $regex: keyword, $options: "i" } }
        ]
      },
      (err, collection) => {
        if (err) throw err;

        res.json(collection);
      }
    );
  },

  //Mudar Informação do user
  updateUserInfo(user) {
    Thread.findByIdAndUpdate(user.userid, { userInfo: user }, function(
      err,
      thread
    ) {
      if (err) throw err;
      console.log(thread);
    });
  },

  //Close Thread
  closeDate(id) {
    Thread.findByIdAndUpdate(id, { closeDate: Date.now }, function(
      err,
      thread
    ) {
      if (err) throw err;
      console.log(thread);
    });
  },
  //Add View
  addView(id) {
    Thread.findByIdAndUpdate(id, { $inc: { views: 1 } }, function(err, thread) {
      if (err) throw err;
      console.log(thread);
    });
  },
  //Add Upvote
  addUpvote(id) {
    Thread.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, function(
      err,
      thread
    ) {
      if (err) throw err;
      console.log(thread);
    });
  },
  //Remove Upvote
  removeUpvote(id) {
    Thread.findByIdAndUpdate(id, { $inc: { upvotes: -1 } }, function(
      err,
      thread
    ) {
      if (err) throw err;
      console.log(thread);
    });
  },
  //Delete Thread
  deleteThread(id) {
    Thread.findByIdAndRemove(id, function(err) {
      if (err) throw err;
      console.log("Thread Deleted");
    });
  }
};
module.exports = crudThread;
