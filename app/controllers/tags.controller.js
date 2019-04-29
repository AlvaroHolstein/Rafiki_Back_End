const { Tag } = require("../models/tags.model");

let crudTag = {
  //Read Get All Tags
  findAll(res) {
    Tag.find({}, (err, collection) => {
      if (err) {
        console.log(err, "Error");
      } else {
        res.json(collection);
      }
    });
  },

  //Add Tag
  addTag(text) {
    let id; //Get the last ID

    //Before Inserting Check if there is already any Tag with that text
    let newTag = Tag({
      id: id,
      text: text
    });

    newTag.save(function(err) {
      if (err) throw err;
      console.log("Tag Added");
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
