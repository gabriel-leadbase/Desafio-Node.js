const registerController = require('../controllers/register.controller')
const loginController = require('../controllers/login.controller')
const permissionController = require('../controllers/permission.controller')

//adapter que facilita o res.send ja mandando em um objeto json

const adapter = {
  async generic (req,res) {
    let fun = req.url.replace('/desafio-node.api/', '') // trata url para deixar so o nome da função
    fun = fun.split('?')[0] // remove parametros get 
      if (fun.includes('user_register')) { // verifica se a função é do Register Controller
        response = await registerController[fun](req.body) // chama a função do register controller de forma dinamica
        res.status(response.statusCode).json(response.body)// retorna resultado da função 
      }else if (fun.includes('user_login')) { // verifica se a função é do Login Controller
        response = await loginController[fun](req.body)// chama a função do Login controller de forma dinamica
        res.status(response.statusCode).json(response.body)// retorna resultado da função
      }else if (fun.includes('permission')) { // verifica se a função é do Permission Controller
        response = await permissionController[fun](req.body)// chama a função do Permission controller de forma dinamica
        res.status(response.statusCode).json(response.body)// retorna resultado da função
      }
  }
}
  
module.exports = adapter
