import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { cpf, password } = req.body;

    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      res.status(404).json({ error: 'User does not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, role } = user;

    return res.json({
      user: {
        id,
        role,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
