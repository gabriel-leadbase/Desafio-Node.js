import { getCustomRepository } from 'typeorm';
import PermissionRepository from '../repositories/PermissionRepository';

interface Request {
  name: string;
}

export async function deletePermission({ name }: Request): Promise<void> {
  const permissionRepository = getCustomRepository(PermissionRepository);

  const existsPermission = await permissionRepository.findOne({
    where: {
      name,
    },
  });

  if (!existsPermission) {
    throw new Error('Permission not found');
  }

  console.log(existsPermission);

  await permissionRepository.delete(existsPermission.id);
}
