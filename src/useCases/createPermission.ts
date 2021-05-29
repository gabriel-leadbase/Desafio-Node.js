import { prisma } from '../database/prisma';

interface Request {
  name: string;
  description: string;
}

export async function createPermission({
  name,
  description,
}: Request): Promise<void> {
  const existsPermission = await prisma.permission.findFirst({
    where: {
      name,
    },
  });

  if (existsPermission) {
    throw new Error('Permission already exists.');
  }

  await prisma.permission.create({
    data: {
      name,
      description,
    },
  });
}
