const { Badge } = require("../models/badges.model");

let crudBadge = {

    findAll(res) {
        Badge.find({}, (err, collection) => {
            if (err) {
                console.log(err)

            }
            else {
                res.json(collection)
            }
        });
    },

    addBadge(name, goal, desc, category) {
        let badges = null
        let id = 0
        Badge.find({}, (err, collection) => {
            if (err) throw err;
            badges = collection
        })

        //check name
        let exist = badges.find(badge => name == badge.name)
        if (!exist) {
            //get category

            badges = badges.filter(badge => category = badge.category)
            //check goal
            let existGoal = badges.find(badge => goal == badge.goal)
            if (!existGoal) {
                
                //get last id
                if (badges.length != 0) {
                    badges.sort(function (a, b) {
                        if (a.id > b.id) return 1;
                        if (a.id < b.id) return -1
                    })

                    id = badges[badges.length - 1].id + 1
                }

                let newBadge = Badge({
                    id: id,
                    name: name,
                    goal: goal,
                    desc: desc,
                    category: category

                })

                newBadge.save(function(err) {
                    if (err) throw err;
                    console.log("Badge Added")
                })
            }

        }

    },

    deleteBadge(id) {
        Badge.findByIdAndRemove(id, function (err) {
            if (err) throw err;
            console.log("Badge Deleted")
        })

    }
}

module.exports = crudBadge