require('dotenv').config()

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
        const database = ``

        mongoose.connect(database, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('mongo connected')
    }

}

module.exports = new AppController().express
