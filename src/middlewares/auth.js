import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../models/User';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: 'Token not provided!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const user = await User.findByPk(decoded.id);

    if (user.role !== 'admin') {
      return res
        .status(401)
        .json({ error: 'You do not have permission to access' });
    }

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Token invalid' });
  }
};
