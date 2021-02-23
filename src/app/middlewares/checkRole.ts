import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

export const checkRole = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authenticatedUser }: { authenticatedUser: User } = request.body;

  if (!authenticatedUser.isAdmin) {
    return response.status(401).json({
      error: {
        code: '101',
        message: 'Usuário sem permissão de acesso'
      }
    });
  }

  next();
};
