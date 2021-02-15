const { insert, fetch } = require('../adapters/mongoose.adapter')

const registerController = {
    async user_register(body){
        let response
        if(!await fetch('user', {cpf: body.cpf})) {
            const query = insert('user', body)
            if(query){
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
        }else {
            response = {
                statusCode: 400,
                body: {
                  status: 'error',
                  desc: 'user already exists'
                }
              }
        }
        return response
    }
}

module.exports = registerController