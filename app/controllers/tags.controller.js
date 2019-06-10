const { Tag } = require("../models/tags.model");

let crudTag = {
  //Read Get All Tags
  findAll(res) {
    try {
      let tags = [];
      Tag.find({}, (err, collection) => {
        if (err) {
          console.log(err, "Error");
        } else {
          tags = collection;
          res.json(collection);
        }
      });
      console.log(tags);
    } catch (err) {
      return res.status(400).send({ error: "Could not find tags" + err });
    }
  },

  //Add Tag
  addTag(res, text) {
    try {
      let tags = null;

      let id = 1; //Get the last ID
      Tag.find({}, (err, collection) => {
        if (err) throw err;
        tags = collection;
        //check name
        let exist = tags.find(tag => tag.text == text);

        if (!exist) {
          if (tags.length != 0) {
            tags.sort(function(a, b) {
              if (a.id > b.id) return 1;
              if (a.id < b.id) return -1;
            });
            id = tags[tags.length - 1].id + 1;
          }
          let newTag = Tag({
            id: id,
            text: text
          });

          newTag.save(function(err) {
            if (err) throw err;
            let success = true;
            res.json({ success: success });
            console.log("Tag Added");
          });
        }
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not add tag" + err });
    }
  },
  //Delete Tag
  deleteTag(res, id) {
    try {
      Tag.findOneAndRemove({ id: id }, function(err) {
        if (err) throw err;
        let success = true;
        res.json({ success: success });
        console.log("Tag Deleted");
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not delete tag" + err });
    }
  }
};

module.exports = crudTag;
