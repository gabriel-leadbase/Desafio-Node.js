const { factory } = require('factory-girl')
const faker = require('faker')
const userModel = require('../../src/models/user')

factory.define('User', userModel, {
  name: faker.name.findName(),
  cpf: faker.address.zipCode(),
  permission: "adm",
  password: faker.internet.password()
})

module.exports = factory