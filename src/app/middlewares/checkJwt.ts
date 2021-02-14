import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import Auth from '../services/Auth';

export const checkJwt = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const header: string | undefined = request.header('authorization');

  if (!header) {
    return response.status(401).json({
      error: {
        code: '098',
        message: 'Usuário sem permissão de acesso.'
      }
    });
  }

  const [, token]: string[] = header.split(' ');

  if (!token) {
    return response.status(401).json({
      error: {
        code: '099',
        message: 'Usuário sem permissão de acesso.'
      }
    });
  }

  try {
    const userId = new Auth().verify(token);
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);

    request.body.authenticatedUser = user;

    next();
  } catch (error) {
    return response.status(401).json({
      error: {
        code: '1000',
        message: 'Token Inválido'
      }
    });
  }
};
