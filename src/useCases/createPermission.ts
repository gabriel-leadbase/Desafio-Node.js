import { getCustomRepository } from 'typeorm';
import PermissionRepository from '../repositories/PermissionRepository';

interface Request {
  name: string;
  description: string;
}

export async function createPermission({
  name,
  description,
}: Request): Promise<void> {
  const permissionRepository = getCustomRepository(PermissionRepository);

  const existsPermission = await permissionRepository.findOne({ name });

  if (existsPermission) {
    throw new Error('Permission already exists.');
  }

  const permission = permissionRepository.create({
    name,
    description,
  });

  await permissionRepository.save(permission);
}
