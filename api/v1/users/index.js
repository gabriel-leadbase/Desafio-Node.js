const Router = require('koa-trie-router')
const Utils = require('../../../database/utils')
const userDb = require('../../../database/user')
const sessionDb = require('../../../database/session')
const { validarRegistro, validarLogin } = require('./validar.middleware')

const router = new Router()

/**
 * Cadastra um novo usuário.
 */
router.post("/", validarRegistro, async ctx => {
    var payload = ctx.request.body

    if (userDb.findByCpf(payload.cpf)) {
        ctx.status = 400
        return ctx.body = { status: 400, message: 'Já existe um usuário com esse CPF.' }
    }

    var user = userDb.create(payload)

    // Nunca enviar senha.
    delete user.senha

    ctx.status = 200
    ctx.body = { status: 200, data: user }
})

/**
 * Efetua o login do usuário retornando uma session id.
 */
router.post("/login", validarLogin, async ctx => {
    var payload = ctx.request.body

    var user = userDb.findByCpf(payload.cpf)
    if (user && Utils.verificarSenha(payload.senha, user.senha)) {
        var session = sessionDb.create(user)
        // Nunca enviar senha.
        delete user.senha

        ctx.status = 200
        return ctx.body = { status: 200, data: { ssid: session.id, user: user } }
    }

    ctx.status = 401
    ctx.body = { status: 401, message: 'CPF ou Senha inválidos.' }
})

module.exports = () => {
    return router.middleware()
}