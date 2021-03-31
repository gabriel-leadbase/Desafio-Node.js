import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

class Auth {
  constructor(User) {
    this.User = User;
  }

  async authenticate(dataUser) {
    const user = await this.User.findOne({ cpf: dataUser.cpf });
    // console.log(user)
    if (!user || !(await bcrypt.compare(dataUser.password, user.password))) {
      console.log("Senhas não são iguais");
      return false;
    }
    return user;
  }

  static generateToken(payload) {
    return jwt.sign(payload, config.get("auth.key"), {
      expiresIn: config.get("auth.tokenExpiresIn"),
    });
  }
}

export default Auth;
