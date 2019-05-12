const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://admin:${process.env.mongoPass}@rafikicluster-uj5p1.mongodb.net/Rafiki?retryWrites=true`, {
    useNewUrlParser: true,
    // pass: '12345678',
    // password: '12345678',
    // user: 'admin'
})

const conn = mongoose.connection

conn.on('error', (err) => {
    console.log(err)
})

conn.once('open', () => {
    console.log(`Mongo server running on ${conn.name} db`)
})

module.exports = {
    conn: conn,
    Schema: mongoose.Schema,
    Model: mongoose.model
}   