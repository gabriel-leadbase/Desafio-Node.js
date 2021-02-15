const { fetch } = require('../adapters/mongoose.adapter')

const loginController = {
    async user_login(body) {
        let response
        const user = await fetch('user',{ cpf: body.cpf })
        if (user){
          if (!await user.compareHash(body.password)) {
           return response = {
              statusCode: 400,
              body: {
                status: 'error',
                desc: 'wrong user or password '
              }
            }
          }
          const token = await user.generateToken()
  
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