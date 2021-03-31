import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  cpf: String,
  password: String,
  role: String
})

const User = mongoose.model("User", schema)

export default User