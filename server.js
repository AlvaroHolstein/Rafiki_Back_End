const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const userController = require('./app/controllers/users.controller')

const app = express()

const port = process.env.PORT || 80

app.use(cors())
/**
 * Fazer rotas 
 */

app.get('/', (req, res) => {
    res.send('Back End Rafiki')
})

app.get('/allusers', (req, res) => {
    //Função criada no controller
    userController.findAll(res)
})
app.get('/allthreads', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Server running on port :${port}`)
})

module.exports = app; 