const { User } = require('../models/users.model')

let crudUser = {
    findAll(res) {
        User.find({}, (err, collection) => {
            if (err) {
                console.log(err, 'erro')
            }
            else {
                console.log(collection, 'collection')
                res.json(collection)
            }
        })
    },
    findOneByName(res, name) {
        //Encontrar o user e devolve-lo
    },
    findOneByEmail(res, mail) {
        //Encontrar user e devolver-lo
    },
    updateUser(res, user) {
        //Encontrar user e atualizar
    },
    deleteUser(res, id) {
        // Encontrar user, eliminá-lo e devolver este user
    },
    insertUser(res, user) {

    }
}

module.exports = crudUser