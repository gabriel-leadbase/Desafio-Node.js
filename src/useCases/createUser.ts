import { hash } from 'bcryptjs';
import { cpf } from 'cpf-cnpj-validator';
import { getCustomRepository } from 'typeorm';
import RoleRepository from '../repositories/RoleRepository';
import UserRepository from '../repositories/UserRepository';

interface Request {
  cpfNumber: string;
  password: string;
  roles: string[];
}

export async function createUser({
  cpfNumber,
  password,
  roles,
}: Request): Promise<void> {
  const userRepository = getCustomRepository(UserRepository);
  const roleRepository = getCustomRepository(RoleRepository);

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

  const existsRoles = await roleRepository.findByIds(roles);

  const user = userRepository.create({
    cpf: cpfNumber,
    password: hashedPassword,
    roles: existsRoles,
  });

  await userRepository.save(user);
}
