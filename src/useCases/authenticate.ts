import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { auth } from '../config/auth';
import { cpf } from 'cpf-cnpj-validator';
import User from '../models/User';

interface Request {
  cpfNumber: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

export async function authenticate({
  cpfNumber,
  password,
}: Request): Promise<Response> {
  const userRepository = getCustomRepository(UserRepository);

  const cpfIsValid = cpf.isValid(cpfNumber);

  if (!cpfIsValid) {
    throw new Error('Invalid CPF number.');
  }

  const user = await userRepository.findOne({ where: { cpf: cpfNumber } });

  if (!user) {
    throw new Error('CPF not found.');
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Password does not match.');
  }

  const token = sign({}, auth.secret, {
    expiresIn: '60m',
    subject: user.id,
  });

  return {
    token,
    user,
  };
}
