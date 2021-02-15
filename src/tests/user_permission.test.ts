/* eslint-disable no-undef */
import '../utils/env';
import supertest from 'supertest';
import app from '../app';
import Database from '../database/connection';
import { getRepository } from 'typeorm';
import { User } from '../app/models/User';
import Auth from '../app/services/Auth';
import { v4 as uuidV4 } from 'uuid';
import { Permission } from '../app/models/Permission';
import { UserPermission } from '../app/models/UserPermission';

const database = Database.getInstance();
const request = supertest(app);

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await database.disconnect();
});

beforeEach(async () => {
  await database.clear();
});

describe('POST /users/:id/permissions', () => {
  test('should return error when user not send authentication token', async () => {
    const userId = uuidV4();

    const response = await request.post(`/users/${userId}/permissions`);

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '098',
      message: 'Usuário sem permissão de acesso.'
    });
  });

  test('should return error when user send invalid token', async () => {
    const token = 'invalidToken';
    const userId = uuidV4();

    const response = await request
      .post(`/users/${userId}/permissions`)
      .set('authorization', `Bearer ${token}`);

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '1000',
      message: 'Token Inválido'
    });
  });

  test('should return error when user has not permission', async () => {
    const user = await createUser();
    const token = createToken(user.id);

    const response = await request
      .post(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`);

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '101',
      message: 'Usuário sem permissão de acesso'
    });
  });

  test('should return error when user not send required params', async () => {
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);

    const response = await request
      .post(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`);

    const { errors } = response.body;

    expect(response.status).toBe(400);
    expect(errors).toHaveLength(1);
  });

  test('should return error when user non-existing', async () => {
    const userId = uuidV4();
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);

    const response = await request
      .post(`/users/${userId}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: 'VISUALIZAR' });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '001',
      message: 'Usuário não encontrado'
    });
  });

  test('should return error when send invalid permission', async () => {
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);

    const response = await request
      .post(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: 'PermissionNonExisting' });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '002',
      message: 'Permissão não encontrado'
    });
  });

  test('should return error when send invalid User ID', async () => {
    const userId = 'invalidUserId';
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);

    const response = await request
      .post(`/users/${userId}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: 'VISUALIZAR' });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '004',
      message: 'Usuário não encontrado'
    });
  });

  test('should return error when user already can permission', async () => {
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);
    const permission = await createPermission('VISUALIZAR');

    const userPermissionRepository = getRepository(UserPermission);
    const userPermissionRepositoryData = userPermissionRepository.create({
      userId: user.id,
      permissionId: permission.id
    });
    await userPermissionRepository.save(userPermissionRepositoryData);

    const response = await request
      .post(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: permission.name });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '003',
      message: 'Permissão já adicionada'
    });
  });

  test('attach permission to user', async () => {
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);
    const permission = await createPermission('VISUALIZAR');

    const response = await request
      .post(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: permission.name });

    const { message } = response.body;

    expect(response.status).toBe(200);
    expect(message).toBe('Permissão adicionada com sucesso');
  });
});

describe('DELETE /users/:id/permissions', () => {
  test('should return error when user not send authentication token', async () => {
    const userId = uuidV4();

    const response = await request.delete(`/users/${userId}/permissions`);

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '098',
      message: 'Usuário sem permissão de acesso.'
    });
  });

  test('should return error when user send invalid token', async () => {
    const token = 'invalidToken';
    const userId = uuidV4();

    const response = await request
      .delete(`/users/${userId}/permissions`)
      .set('authorization', `Bearer ${token}`);

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '1000',
      message: 'Token Inválido'
    });
  });

  test('should return error when user has not permission', async () => {
    const user = await createUser();
    const token = createToken(user.id);

    const response = await request
      .delete(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`);

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '101',
      message: 'Usuário sem permissão de acesso'
    });
  });

  test('should return error when user not send required params', async () => {
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);

    const response = await request
      .delete(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`);

    const { errors } = response.body;

    expect(response.status).toBe(400);
    expect(errors).toHaveLength(1);
  });

  test('should return error when user non-existing', async () => {
    const userId = uuidV4();
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);

    const response = await request
      .delete(`/users/${userId}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: 'VISUALIZAR' });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '001',
      message: 'Usuário não encontrado'
    });
  });

  test('should return error when send invalid permission', async () => {
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);

    const response = await request
      .delete(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: 'PermissionNonExisting' });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '002',
      message: 'Permissão não encontrado'
    });
  });

  test('should return error when send invalid User ID', async () => {
    const userId = 'invalidUserId';
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);

    const response = await request
      .delete(`/users/${userId}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: 'VISUALIZAR' });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '004',
      message: 'Usuário não encontrado'
    });
  });

  test('should return error when user already delete permission', async () => {
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);
    const permission = await createPermission('VISUALIZAR');

    const response = await request
      .delete(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: permission.name });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '003',
      message: 'Permissão já excluída'
    });
  });

  test('dettach permission to user', async () => {
    const user = await createUser({ isAdmin: true });
    const token = createToken(user.id);
    const permission = await createPermission('VISUALIZAR');

    const userPermissionRepository = getRepository(UserPermission);
    const userPermissionRepositoryData = userPermissionRepository.create({
      userId: user.id,
      permissionId: permission.id
    });
    await userPermissionRepository.save(userPermissionRepositoryData);

    const response = await request
      .delete(`/users/${user.id}/permissions`)
      .set('authorization', `Bearer ${token}`)
      .send({ name: permission.name });

    const { message } = response.body;

    expect(response.status).toBe(200);
    expect(message).toBe('Permissão excluída com sucesso');
  });
});

const createUser = async (data?: { isAdmin: boolean }): Promise<User> => {
  const userRepository = getRepository(User);

  const userData = {
    name: 'Fulano',
    cpf: '11122233344',
    password: '123123',
    isAdmin: false
  };

  const userRepositoryData = userRepository.create({
    ...userData,
    ...data
  });

  const user = await userRepository.save(userRepositoryData);

  return user;
};

const createToken = (userId: string): string => {
  const token = new Auth().sign(userId);
  return token;
};

const createPermission = async (name: string): Promise<Permission> => {
  const permissionRepository = getRepository(Permission);

  const permissionRepositoryData = permissionRepository.create({ name });

  const permission = await permissionRepository.save(permissionRepositoryData);

  return permission;
};
