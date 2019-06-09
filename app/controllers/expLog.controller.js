const ExpLog = require("../models/expLog.model.js")

let crudExpLog = {
    add(res, ep) {
        console.log(ep)
        ExpLog.create(ep, (err, expLog) => {
            if (err) throw err
            res.json({ msg: "success", expLog: expLog })
        })
    },
    delete(res, _id) {
        ExpLog.findByIdAndRemove(_id, (err) => {
            if (err) throw err
            res.json({ msg: "success" })
        })
    }
}
module.exports = crudExpLog;