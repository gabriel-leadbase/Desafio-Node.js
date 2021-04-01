import jwt from 'jsonwebtoken';
import User from '../../models/User';
import auth from '../../config/auth';

class CreateSessionService {
  async execute({ cpf, senha }) {
    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      console.log('Usuário não encontrado');
    }

    if (!(await user.checkSenha(senha))) {
      console.log('senha incorreta');
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
