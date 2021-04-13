const uuid = require('uuid')

/**
 * O banco de dados.
 */
const SESSION = []

/**
 * Retorna todo o banco de dados.
 */
module.exports.all = () => {
    return SESSION
}

/**
 * Procura no banco de dados por id.
 */
module.exports.findById = (ssid) => {
    var index = SESSION.findIndex(session => session.id === ssid)

    if (index >= 0) {
        return SESSION[index]
    }

    return null
}

/**
 * Cria uma nova session no banco de dados.
 */
module.exports.create = (user) => {
    var session = {
        id: uuid.v4(),
        userId: user.id
    }

    SESSION.push(session)

    return session
}