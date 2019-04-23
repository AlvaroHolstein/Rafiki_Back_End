const { User } = require('../models/users.model')

let crudUser = {
    findAll() {
        User.find({}, (err, collection) => {
            if (err) {
                console.log(err, 'erro')
            }
            else {
                console.log(collection)
            }
        })
    }
}

module.exports = crudUser