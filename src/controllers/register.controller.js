const { insert, fetch } = require('../adapters/mongoose.adapter')

const registerController = {
    async user_register (body) {
        let response
        if (body.cpf && body.permission && body.password && body.name) { // verifica se todos os campos foram preenchidos 
          if (!await fetch('user', {cpf: body.cpf})) { // verifica se o usuario não existe
            if(body.permission == "adm" || "sales") {
              const query = insert('user', body)  // insere no banco de dados o novo usuario
              if (query){
                response = {
                  statusCode: 200,
                    body: {
                      status: 'success',
                      desc: 'Registered successfully'
                    }
                }
              } else {
                response = {
                  statusCode: 400,
                    body: {
                      status: 'error',
                      desc: 'Register failed'
                    }
                }
              }
          } else {
            response = {
              statusCode: 400,
                body: {
                  status: 'error',
                  desc: 'user already exists'
                }
            }
          }
        } else {
        response = {
          statusCode: 400,
          body: {
            status: 'error',
            desc: 'required fields are not filled'
          }
        }
      }
    } else {
      response = {
        statusCode: 400,
        body: {
          status: 'error',
          desc: 'this permission does not exists'
        }
      }
    }
      return response
    }
}

module.exports = registerController