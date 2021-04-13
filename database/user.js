const Utils = require('./utils')

/**
 * O banco de dados
 */
const USERS = []

/**
 * Retorna todo o banco de dados.
 */
module.exports.all = () => {
    return USERS
}

/**
 * Cria um novo usuário no banco de dados.
 */
module.exports.create = (payload) => {
    var user = {
        id: Utils.gerarId(),
        ...payload,
        senha: Utils.hashSenha(payload.senha)
    }

    USERS.push(user)

    return { ...user }
}

/**
 * Atualiza um registro pelo id.
 */
module.exports.updateById = (id, user) => {
    var index = USERS.findIndex((user) => user.id === id)

    if (index >= 0) {
        USERS[index] = user
    }
}

/**
 * Procura um usuário pelo cpf.
 */
module.exports.findByCpf = (cpf) => {
    var index = USERS.findIndex((user) => user.cpf === cpf)

    if (index >= 0) {
        return { ...USERS[index] }
    }

    return null
}

/**
 * Procura um usuário pelo id.
 */
module.exports.findById = (id) => {
    var index = USERS.findIndex((user) => user.id === id)

    if (index >= 0) {
        return { ...USERS[index] }
    }

    return null
}