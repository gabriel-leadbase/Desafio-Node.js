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

    const { id } = user;

    return {
      user: {
        id,
        cpf,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    };
  }
}

export default CreateSessionService;
