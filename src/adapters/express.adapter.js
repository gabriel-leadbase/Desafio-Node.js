const registerController = require('../controllers/register.controller')
const loginController = require('../controllers/login.controller')

//adapter que facilita o res.send ja mandando em um objeto json

const adapter = {
    async generic (req,res) {
      let fun = req.url.replace('/desafio-node.api/', '')
      fun = fun.split('?')[0]
        if (fun.includes('user_register')) {
          response = await registerController[fun](req.body)
          res.status(response.statusCode).json(response.body)
        }else if (fun.includes('user_login')) {
          response = await loginController[fun](req.body)
          res.status(response.statusCode).json(response.body)
        }
    }
  }
  
module.exports = adapter
