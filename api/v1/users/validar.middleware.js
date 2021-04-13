/**
 * Valida o formulário enviado para assegurar os dados
 * nescessário para efetuar o login. Se não estiver de
 * acordo, retorna 400
 */
module.exports.validarLogin = async (ctx, next) => {
    var payload = ctx.request.body

    if (
        !payload.hasOwnProperty('cpf')  ||
        !payload.hasOwnProperty('senha')
       ) {
        ctx.status = 400
        ctx.body = { status: 400, messages: [
            "cpf é obrigatório.",
            "senha é obrigatório.",
        ]}
    } else {
        await next()
    }
}

/**
 * Valida o formulário enviado para assegurar os dados
 * nescessário para efetuar o cadastro. Se não estiver de
 * acordo, retorna 400
 */
module.exports.validarRegistro = async (ctx, next) => {
    var payload = ctx.request.body

    if (
        !payload.hasOwnProperty('nome')  ||
        !payload.hasOwnProperty('cpf')   ||
        !payload.hasOwnProperty('senha') ||
        !payload.hasOwnProperty('roles') ||
        (payload.hasOwnProperty('roles') && !Array.isArray(payload.roles))
       ) {
        ctx.status = 400
        ctx.body = { status: 400, messages: [
            "nome é obrigatório.",
            "cpf é obrigatório.",
            "senha é obrigatório.",
            "roles é obrigatório e deve ser um array.",
        ]}
    } else {
        await next()
    }
}