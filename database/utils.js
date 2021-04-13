const Crypto = require('crypto')

const criarHash = () => {
    return Crypto.createHmac('sha256', 'secret')
}

module.exports.gerarId = () => {
    return parseInt(`${(new Date()) / 1000}`.replace('.', ''))
}

module.exports.hashSenha = (senha) => {
    return criarHash().update(senha).digest('hex')
}

module.exports.verificarSenha = (senha, hash) => {
    return criarHash().update(senha).digest('hex') === hash
}