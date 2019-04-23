const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 80

/**
 * Fazer rotas 
 */

app.get('/', (req, res) => {
    res.send('Back End Rafiki')
})

app.listen(port, () => {
    console.log(`Server running on port :${port}`)
})

module.exports = app; 