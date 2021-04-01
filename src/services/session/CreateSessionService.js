import jwt from 'jsonwebtoken';
import User from '../../models/User';
import auth from '../../config/auth';
import AppError from '../../errors/AppError';

class CreateSessionService {
  async execute({ cpf, senha }) {
    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      return new AppError('Usuário não encontrado', 400);
    }

    if (!(await user.checkSenha(senha))) {
      return new AppError('senha incorreta', 400);
    }

    const { id, admin } = user;

    return {
      user: {
        id,
        cpf,
        admin,
      },
      token: jwt.sign({ id, admin }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    };
  }
}

export default CreateSessionService;
