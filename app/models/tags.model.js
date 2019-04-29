const { Schema, Model } = require("../../mongo_connect");
/*Tags
 * Tem um id, e um text
 */

const tagSchema = Schema({
  id: {
    type: Number
  },
  text: {
    type: String
  }
});

const Tag = Model("Tag", tagSchema);

module.exports = {
  Tag: Tag,
  tagSchema: tagSchema
};
