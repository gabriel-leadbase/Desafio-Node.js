const Router = require('koa-trie-router')
const { auth } = require('./auth.middleware')
const { validarPayload } = require('./validar.middleware')
const userDb = require('../../../database/user')

const router = new Router()

/**
 * Lista todos os usuários.
 */
router.get('/', auth, async (ctx) => {
    ctx.body = { status: 200, data: userDb.all() }
})

/**
 * Retorna os dados do usuário pela SSID.
 */
router.get('/perfil', auth, async (ctx) => {
    ctx.body = { status: 200, data: ctx.state.user }
})

/**
 * Adiciona ou remove função do usuário.
 */
router.post('/change', auth, validarPayload, async (ctx) => {
    var payload = ctx.request.body
    var user = userDb.findById(payload.userId)

    if (user) {
        user = { ...user, roles: payload.roles }
        userDb.updateById(user.id, user)

        // Nunca enviar senha.
        var _user = { ...user }
        delete _user.senha

        ctx.status = 200
        return ctx.body = { status: 200, data: _user }
    }

    ctx.status = 400
    ctx.body = { status: 400, message: "Não foi possível modificar as funções." }
})

module.exports = () => {
    return router.middleware()
}