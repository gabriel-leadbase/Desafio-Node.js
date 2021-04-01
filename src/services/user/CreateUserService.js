import User from '../../models/User';
import AppError from '../../errors/AppError';

class CreateUserService {
  async execute({ cpf, senha, admin }) {
    const userExists = await User.findOne({ where: { cpf } });

    if (userExists) {
      return new AppError('usuario já existe', 400);
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
