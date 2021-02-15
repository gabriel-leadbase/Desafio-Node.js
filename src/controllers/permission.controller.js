const { fetch, update } = require('../adapters/mongoose.adapter')
const jwt = require('jsonwebtoken')
const permissionController = {
    async modify_permission(body) {
        let response
        if (body.permission == 'adm' || body.permission == 'sales' ) {
            await jwt.verify(body.token, process.env.SECRET_SESSION_TOKEN, async(err, dec) => {
                if (err) {
                    response = {
                        statusCode: 403,
                        body: {
                          status: 'error',
                          desc: 'This token is not valid'
                        }
                      }
                } else {
                  console.log(dec)
                  if (dec.cpf !== body.cpf && !dec.admin || dec.blocked == true) {
                    response = {
                        statusCode:203,
                        body:{
                            status: 'error',
                            desc: 'you dont have permission'
                        }
                    }
                  } else {
                    const user = await fetch('user',{ cpf: body.cpf })
                    if (user){
                        const query = await update('user', { permission: body.permission}, { cpf: body.cpf })
                        if(query){
                            response = {
                                statusCode: 200,
                                body: {
                                    status: 'success',
                                    desc: 'user ' + user.name + ' is now ' + body.permission
                                }
                              }
                        } else {
                            response = {
                                statusCode: 400,
                                body: {
                                  status: 'error',
                                  desc: 'fail on update user permission'
                                }
                              }
                        }
                    } else {
                        response = {
                          statusCode: 400,
                          body: {
                            status: 'error',
                            desc: 'user not found'
                          }
                        }
                      }
                  }
                }
             })
        } else {
            response = {
                statusCode: 400,
                body: {
                  status: 'error',
                  desc: 'This permission does not exists'
                }
            }
        }
        console.log(response)
        return response
    }
        
}

module.exports = permissionController