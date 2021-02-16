const { fetch } = require('../adapters/mongoose.adapter')

const loginController = {
  // logica responsavel por validar se o usuario existe e caso afirmativo gerar um JWT
    async user_login(body) {
        let response
        const user = await fetch('user',{ cpf: body.cpf }) // busca usuario no banco de dados
        if (user){
          if (!await user.compareHash(body.password)) { // chama a função que compara as senhas
           return response = {
              statusCode: 400,
              body: {
                status: 'error',
                desc: 'wrong user or password '
              }
            }
          }
          const token = await user.generateToken() // chama a função que gera o token
          if (token) {
            console.log(token)
            response = {
              statusCode: 200,
              body: { token, id: user.id, name: user.name, permission: user.permission}
            }
          }
        } else {
          response = {
            statusCode: 400,
            body: {
              status: 'error',
              desc: 'wrong user or password'
            }
          }
        }
        return response
      }
}

module.exports = loginController