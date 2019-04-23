const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Rafiki?gssapiServiceName=mongodb', { useNewUrlParser: true })

const conn = mongoose.connection

console.log(`Mongo server running on ${conn.name} db`)
module.exports = {
    conn: conn,
    Schema: mongoose.Schema,
    Model: mongoose.Model 
}