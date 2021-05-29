import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { prisma } from '../database/prisma';
import { auth } from '../config/auth';
import { cpf } from 'cpf-cnpj-validator';

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
  const cpfIsValid = cpf.isValid(cpfNumber);

  if (!cpfIsValid) {
    throw new Error('Invalid CPF number.');
  }

  const user = await prisma.user.findUnique({ where: { cpf: cpfNumber } });

  if (!user) {
    throw new Error('CPF not found.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Password does not match.');
  }

  const token = jwt.sign({}, auth.secret, {
    expiresIn: '60m',
    subject: user.id,
  });

  delete user.password;

  return {
    token,
    user,
  };
}
