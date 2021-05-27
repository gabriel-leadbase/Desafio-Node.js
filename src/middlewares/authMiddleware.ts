import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../DTO/AuthDTO';
import AppError from '../errors/Error';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(401).send('Unauthorized');
  };

  const token = authorization

  try {  
    const payload = jwt.verify(token, 'secret');

    const { id, role } = payload as TokenPayload;

    req.userId = id;
    req.userRole = role;
    
    return next();

  } catch(err) {
    throw new AppError(err)
  }
}