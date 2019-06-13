const { Schema, Model, ObjectId } = require("../../mongo_connect");
console.log(ObjectId)
/**
 * Propriedades Calculadas:
 *  Rank
 *  Level
 *  Badges
 */
const userSchema = Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  experience: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  },  
  picture: {
    type: String,
    default: "http://www.coffeebrain.org/wiki/images/9/93/PEOPLE-NoFoto.JPG"
  },
  follow: {
    type: [Number], // Array com os id's das threads a seguir
  },
  year: {
    type: Number,
    default: 0
  },
  course: {
    type: String,
    default: ""
  },
  upvotes: {
    /**
     * idUpvote (_id)
     * type (thread, answer, comment)
     */
    type: Array,
    // default: []
  },
  /**
  * id
  * idUserFirst
  * text
  * visto
  * date
  */
  notifications: Array
});

const User = Model("User", userSchema);
// console.log(User.schema.tree) //Schema do Model

module.exports = {
  User: User,
  userSchema: userSchema,
};
