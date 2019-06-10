const ExpLog = require("../models/expLog.model.js");

let crudExpLog = {
  add(res, ep) {
    try {
      console.log(ep);
      ExpLog.create(ep, (err, expLog) => {
        if (err) throw err;
        res.json({ msg: "success", expLog: expLog });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not add log" + err });
    }
  },
  delete(res, _id) {
    try {
      ExpLog.findByIdAndRemove(_id, err => {
        if (err) throw err;
        res.json({ msg: "success" });
      });
    } catch (err) {
      return res.status(400).send({ error: "Could not delete log" + err });
    }
  }
};
module.exports = crudExpLog;
