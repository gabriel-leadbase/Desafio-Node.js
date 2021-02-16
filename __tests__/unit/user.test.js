const request = require('supertest')
const factory = require('../utils/user.factory')
const faker = require('faker') 
const app = require('../../src/app')
const userModel = require('../../src/models/user')
// testes dos usuarios 
describe('User', () => {
    beforeEach(async () => {
       // truncate no banco antes de cada teste
        return Promise.all(
            [userModel.deleteMany({})]
          )
     })

    it('should authenticated with valid credentials', async () => {
        const user = await factory.create('User', {
           password: '123456'
        })
     
        const response = await request(app)
            .post('/desafio-node.api/user_login')
            .send({
              cpf: user.cpf,
              password: '123456'
            })
     
        expect(response.status).toBe(200)
     
     })
     it('should not authenticated with invalid cpf', async () => {
        const user = await factory.create('User', {
           password: '123456'
        })
  
        const response = await request(app)
           .post('/desafio-node.api/user_login')
           .send({
              cpf: '123123123123123'
           })
  
        expect(response.status).toBe(400)
     })
     
   it('should not authenticated with invalid password', async () => {
    const user = await factory.create('User', {
       password: '123456'
    })

    const response = await request(app)
       .post('/desafio-node.api/user_login')
       .send({
          cpf: user.cpf,
          password: '12345678'
       })

    expect(response.status).toBe(400)
 })
 it('should return a token when authenticated', async () => {
    const user = await factory.create('User', {
       password: '123456'
    })

    const response = await request(app)
       .post('/desafio-node.api/user_login')
       .send({
          cpf: user.cpf,
          password: '123456'
       })

    expect(response.body).toHaveProperty('token')
 })
 it('should be able to register a new user', async () => {

   
    const response = await request(app)
        .post('/desafio-node.api/user_register')
        .send({
            name: faker.name.findName(),
            cpf: faker.address.zipCode(),
            permission: "adm",
            password: faker.internet.password()
        })
 
    expect(response.status).toBe(200)
 
 })
 let fields = ['name', 'cpf', 'permission', 'password']
 let body = {
   name: faker.name.findName(),
   cpf: faker.address.zipCode(),
   permission: "adm",
   password: faker.internet.password()
  }
 for(field of fields) {
    it('should not able register a user with no ' + field, async () => {
       delete body[field]
       const response = await request(app)
       .post(`/desafio-node.api/user_register`)
       .send(body)
 
       expect(response.status).toBe(400)
   })
 }
   it('should not be able to register a user that already exists', async () => {
      const user = await factory.create('User')

      const resonse = await request(app)
      .post('/desafio-node.api/user_register')
      .send({
         name: user.name,
         cpf: user.cpf,
         permission: user.permission,
         password: user.password
      })

      expect(resonse.status).toBe(400)
   })
})