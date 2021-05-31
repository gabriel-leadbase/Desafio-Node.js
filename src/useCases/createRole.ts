import { getCustomRepository } from 'typeorm';
import PermissionRepository from '../repositories/PermissionRepository';
import RoleRepository from '../repositories/RoleRepository';

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
  const permissionRepository = getCustomRepository(PermissionRepository);

  const existsRole = await roleRepository.findOne({ name });

  if (existsRole) {
    throw new Error('Role already exists.');
  }

  const existsPermissions = await permissionRepository.findByIds(permissions);

  const role = roleRepository.create({
    name,
    description,
    permission: existsPermissions,
  });

  await roleRepository.save(role);
}
