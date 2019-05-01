const { Tag } = require("../models/tags.model");

let crudTag = {
  //Read Get All Tags
  findAll(res) {
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
  },

  //Add Tag
  addTag(text) {
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
          console.log("Tag Added");
        });
      }
    });
  },
  //Delete Tag
  deleteTag(id) {
    Tag.findByIdAndRemove(id, function(err) {
      if (err) throw err;
      console.log("Tag Deleted");
    });
  }
};

module.exports = crudTag;
