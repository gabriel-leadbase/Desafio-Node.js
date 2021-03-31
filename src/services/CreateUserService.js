import User from '../models/User';

class CreateUserService {
  async execute({ cpf, senha, admin }) {
    const userExists = await User.findOne({ where: { cpf } });

    if (userExists) {
      console.log('usuario já existe');
    }

    const user = await User.create({
      cpf,
      senha,
      admin,
    });
    delete user.password;
    return user;
  }
}
export default CreateUserService;
