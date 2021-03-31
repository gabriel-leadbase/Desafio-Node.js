import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  cpf: String,
  password: String,
  role: String
})

schema.set("toJSON", { // utilizado para intervir na serialização e customizar o resultado final do obj
  transform: (doc, ret, options) => ({ // transform para remover o password do obj final
    _id: ret._id,
    cpf: ret.cpf,
    name: ret.name,
    role: ret.role
  })
});

const User = mongoose.model("User", schema)

export default User