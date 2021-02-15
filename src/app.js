require('dotenv').config({
    path: process.env.NODE_ENV === ".env"
})

const express = require('express')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const cors = require('cors')
const bodyParser = require('body-parser')

class AppController {
    constructor() {
        this.express = express()

        this.dbConnect()
        this.middlewares()
        this.routes()
    }


    middlewares() {
        this.express.use(cors())
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({extended: false}))
    }

    routes() {   
        this.express.use(require('./routes/express.routes'))
    }
    
    dbConnect() {
        const database = `mongodb+srv://dev:d3s4f1o123@cluster0.vidrm.mongodb.net/desafio-nodejs?retryWrites=true&w=majority`

        mongoose.connect(database, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('mongo connected')
    }

}

module.exports = new AppController().express
