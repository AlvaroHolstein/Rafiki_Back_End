const { User } = require('../models/users.model')

let crudUser = {
    findAll(res) {
        User.find({}, (err, collection) => {
            if (err) {
                console.log(err, 'erro')
            }
            else {
                res.json(collection)
            }
        })
    }
}

module.exports = crudUser