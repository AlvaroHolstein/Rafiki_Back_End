const { Badge } = require("../models/badges.model");

let crudBadge = {
  findAll(res) {
    try {
      Badge.find({}, (err, collection) => {
        if (err) {
          console.log(err);
        } else {
          console.log(collection, "BADGESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
          res.json(collection);
        }
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not find badges" + err });
    }
  },

  addBadge(res, name, goal, desc, category, specific) {
    try {
      let badges = null;
      let id = 1;
      Badge.find({}, (err, collection) => {
        if (err) throw err;
        badges = collection;
        //check name
        console.log(badges, "BADGGGGEEESSSSSS")

        let exist = badges.find(badge => {
          console.log(badge)
          console.log(name, badge.name)
          console.log(category, badge.category)
          if (name == badge.name && category == badge.category) {
            return true
          }
          return false
        });
        console.log(exist, "EXISTTTTTT")
        if (!exist) {
          //get category

          badges = badges.filter(badge => (category == badge.category));
          //check goal
          //get last id
          if (badges.length != 0) {
            badges.sort(function (a, b) {
              if (a.id > b.id) return 1;
              if (a.id < b.id) return -1;
            });

            id = badges[badges.length - 1].id + 1;
          }

          let newBadge = Badge({
            id: id,
            name: name,
            goal: goal,
            desc: desc,
            category: category,
            specific: specific
          });

          newBadge.save(function (err) {
            if (err) throw err;
            let success = true;
            console.log("Badge Added");

            res.json({ success: success, badge: newBadge });
          });
        }
        else {
          res.json({ msg: "Badge já existe", success: false })
        }
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not add badge" + err });
    }
  },

  deleteBadge(res, id) {
    try {
      console.log(id, "id !!!!!!!!!!!!!!!!!!!!!!!!!!!");
      Badge.findOneAndRemove({ id: id }, function (err) {
        if (err) throw err;
        console.log("Badge Deleted");
        let success = true;
        res.json({ success: success });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not delete badge" + err });
    }
  }
};

module.exports = crudBadge;
