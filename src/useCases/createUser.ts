import bcrypt from 'bcryptjs';
import { prisma } from '../database/prisma';
import { cpf } from 'cpf-cnpj-validator';

interface Request {
  cpfNumber: string;
  password: string;
}

export async function createUser({
  cpfNumber,
  password,
}: Request): Promise<void> {
  const cpfIsValid = cpf.isValid(cpfNumber);

  if (!cpfIsValid) {
    throw new Error('Invalid CPF number.');
  }

  const cpfAlreadyExists = await prisma.user.findFirst({
    where: {
      cpf: cpfNumber,
    },
  });

  if (cpfAlreadyExists) {
    throw new Error('CPF already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  await prisma.user.create({
    data: {
      cpf: cpfNumber,
      password: hashedPassword,
    },
  });
}
