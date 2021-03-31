import mongoose from 'mongoose'
import Util from "util"
import bcrypy from "bcrypt"

const hashAsync = Util.promisify(bcrypy.hash)
const schema = new mongoose.Schema({
  name: String,
  cpf: String,
  password: String,
  role: String
})

schema.pre("save", async function(next) { // middleware para interceptar o método save() do mongoose
  if (!this.password || !this.isModified("password")) {
    return next()
  }
  try {
    const hashedPassword = await hashAsync(this.password, 10)
    this.password = hashedPassword;
    // console.log(this.password)
  } catch (err) {
    next(err)
  }
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