import User from '../../models/User';

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

    delete (user.senha, user.senha_hash);

    return user;
  }
}
export default CreateUserService;
