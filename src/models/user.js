const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const rand_token = require('rand-token')
// modelo do banco de dados para os usuarios
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3
  },
  cpf: {
    type: String,
    required: true,
    min: 3
  },
  permission: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  blocked: {
    type: Boolean,
    default: false
  }
})
//função que criptografa a senha do usuario automaticamente durante a criação da conta
UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 8)

})

UserSchema.methods = {
  // função para comparar as senhas durante o login do usuario
  async compareHash(hash) {
    return await bcrypt.compare(hash, this.password)
  },

  // função para criar json web token no login com informações do usuario
  generateToken() {
    let obj = { id: this.id, cpf: this.cpf, refresh: rand_token.uid(20) }
    if (this.permission == "adm") {
      obj.admin = true
    }
    if (this.blocked == true) {
      obj.blocked = true
    }
    return jwt.sign(obj, process.env.SECRET_SESSION_TOKEN, {
      expiresIn: '4h'
    })
  }
}

module.exports = mongoose.model('user', UserSchema)
