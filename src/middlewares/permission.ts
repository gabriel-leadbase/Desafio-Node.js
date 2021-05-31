import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { auth } from '../config/auth';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

async function decoder(request: Request): Promise<User | undefined> {
  const authHeader = request.headers.authorization as string;
  const userRepository = getCustomRepository(UserRepository);

  if (!authHeader) {
    throw new Error('Token not present.');
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new Error('Token not present.');
  }

  const decoded = verify(token, auth.secret) as TokenPayload;

  const user = await userRepository.findOne(decoded.sub, {
    relations: ['roles'],
  });

  return user;
}

function is(role: String[]) {
  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const user = await decoder(request);

    const userRoles = user?.roles.map(role => role.name);

    const existsRoles = userRoles?.some(r => role.includes(r));

    if (existsRoles) {
      return next();
    }

    return response.status(401).json({ message: 'Not authorized!' });
  };

  return roleAuthorized;
}

export { is };
