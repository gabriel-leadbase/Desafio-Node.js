import { getCustomRepository } from "typeorm";
import RoleRepository from "../repositories/RoleRepository";

interface Request {
  name: string;
  description: string;
  permissions: string[];
}

export async function createRole({
  name,
  description,
  permissions,
}: Request): Promise<void> {
  const roleRepository = getCustomRepository(RoleRepository);

  const existsRole = await roleRepository.findOne({
    where: {
      name,
    }
  });

  if (existsRole) {
    throw new Error('Role already exists.');
  }

  const role = roleRepository.create({
    name,
    description,
  })

  await roleRepository.save(role);
}
