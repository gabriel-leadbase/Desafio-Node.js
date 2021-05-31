import { hash } from 'bcryptjs';
import { cpf } from 'cpf-cnpj-validator';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

interface Request {
  cpfNumber: string;
  password: string;
}

export async function createUser({
  cpfNumber,
  password,
}: Request): Promise<void> {
  const userRepository = getCustomRepository(UserRepository);

  const cpfIsValid = cpf.isValid(cpfNumber);

  if (!cpfIsValid) {
    throw new Error('Invalid CPF number.');
  }

  const cpfAlreadyExists = await userRepository.findOne({
    where: {
      cpf: cpfNumber,
    },
  });

  if (cpfAlreadyExists) {
    throw new Error('CPF already exists.');
  }

  const hashedPassword = await hash(password, 8);

  const user = userRepository.create({
    cpf: cpfNumber,
    password: hashedPassword,
  });

  await userRepository.save(user);
}
