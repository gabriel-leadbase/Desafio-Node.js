/**
 * Valida o formulário enviado para assegurar os dados
 * nescessário para a troca de função. Se não estiver de
 * acordo, retorna 400
 */
module.exports.validarPayload = async (ctx, next) => {
    var payload = ctx.request.body

    if (
        !payload.hasOwnProperty('userId') ||
        !payload.hasOwnProperty('roles')  ||
        (payload.hasOwnProperty('roles')  && !Array.isArray(payload.roles))
       ) {
        ctx.status = 400
        ctx.body = { status: 400, messages: [
            "userId é obrigatório.",
            "roles é obrigatório e deve ser um array.",
        ]}
    } else {
        await next()
    }
}