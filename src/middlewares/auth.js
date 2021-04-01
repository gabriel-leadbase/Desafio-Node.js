import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User';
import authConfig from '../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (user.admin === false) {
      return res.status(401).json({
        error: 'Usuario deve ser administrador para acessar essa rota',
      });
    }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token ivalido' });
  }
};
