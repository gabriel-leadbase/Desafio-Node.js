const express = require('express')
const adapter = require('../adapters/express.adapter')
const routes = express.Router()

//rota de registro de um usario
routes.post('/desafio-node.api/user_register', adapter.generic)

//rota de login 
routes.post('/desafio-node.api/user_login', adapter.generic)

//rota de permissão
routes.put('/desafio-node.api/modify_permission', adapter.generic)

module.exports = routes