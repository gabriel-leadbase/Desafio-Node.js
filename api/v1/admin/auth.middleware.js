const userDb = require('../../../database/user')
const sessionDb = require('../../../database/session')

// DRY
const retornar401 = (ctx) => {
    ctx.status = 401
    ctx.body = { status: 401, message: 'Não autorizado' }
}

/**
 * Checa se existe no header a SSID,
 * se existir, procura a session no banco de dados
 * e coloca o usuário no ctx da requisição e permite
 * o acesso a rota mas se a SSID não estiver no header
 * retorna um 401
 */
module.exports.auth = async (ctx, next) => {
    var ssid = ctx.get('X-SSID') || null
    var session = sessionDb.findById(ssid)

    if (ssid && session) {
        var user = userDb.findById(session.userId)
        if (user && user.roles.includes('admin')) {
            delete user.senha
            ctx.state.user = user
            await next()
        } else {
            retornar401(ctx)
        }
    } else {
        retornar401(ctx)
    }
}