/* eslint-disable no-undef */
import '../utils/env';
import supertest from 'supertest';
import app from '../app';
import Database from '../database/connection';
import { getRepository } from 'typeorm';
import { User } from '../app/models/User';
import Auth from '../app/services/Auth';
import { v4 as uuidV4 } from 'uuid';

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

describe('GET /users', () => {
  test('should return error when user not authenticated', async () => {
    const response = await request.get('/users');

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '098',
      message: 'Usuário sem permissão de acesso.'
    });
  });

  test('should return error when user send invalid token', async () => {
    const response = await request
      .get('/users')
      .set('authorization', 'Bearer asasasasasas');

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '1000',
      message: 'Token Inválido'
    });
  });

  test('fetching all users', async () => {
    const user = await createUser();
    const token = createToken(user.id);

    const response = await request
      .get('/users')
      .set('authorization', `Bearer ${token}`);

    const { list } = response.body;

    expect(response.status).toBe(200);
    expect(list).toEqual([
      {
        id: user.id,
        name: user.name
      }
    ]);
  });
});

describe('POST /users', () => {
  test('return error when not sending required params', async () => {
    const response = await request.post('/users').send({});

    const { errors } = response.body;

    expect(response.status).toBe(400);
    expect(errors).toHaveLength(4);
  });

  test('return error when CPF already existing', async () => {
    const user = await createUser();

    const response = await request.post('/users').send({
      name: 'Ciclano',
      cpf: user.cpf,
      password: '123123'
    });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '001',
      message: 'CPF em uso'
    });
  });

  test('create a new user', async () => {
    const response = await request.post('/users').send({
      name: 'Ciclano',
      cpf: '11122233344',
      password: '123123'
    });

    const { message } = response.body;

    expect(response.status).toBe(200);
    expect(message).toBe('Usuário criado com sucesso');
  });
});

describe('GET /users/:id', () => {
  test('should return error when user not authenticated', async () => {
    const userId = uuidV4();

    const response = await request.get(`/users/${userId}`);

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '098',
      message: 'Usuário sem permissão de acesso.'
    });
  });

  test('should return error when user send invalid token', async () => {
    const userId = uuidV4();

    const response = await request
      .get(`/users/${userId}`)
      .set('authorization', 'Bearer asasasasasas');

    const { error } = response.body;

    expect(response.status).toBe(401);
    expect(error).toEqual({
      code: '1000',
      message: 'Token Inválido'
    });
  });

  test('should return error when send non-existing userId', async () => {
    const userId = uuidV4();
    const user = await createUser();
    const token = createToken(user.id);

    const response = await request
      .get(`/users/${userId}`)
      .set('authorization', `Bearer ${token}`);

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '001',
      message: 'Usuário não encontrado'
    });
  });

  test('should return error when send invalid userId', async () => {
    const userId = 'invalidUserId';
    const user = await createUser();
    const token = createToken(user.id);

    const response = await request
      .get(`/users/${userId}`)
      .set('authorization', `Bearer ${token}`);

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '002',
      message: 'Usuário não encontrado'
    });
  });

  test('get specific user by ID', async () => {
    const user = await createUser();
    const token = createToken(user.id);

    const response = await request
      .get(`/users/${user.id}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: user.id,
      name: user.name,
      isAdmin: false,
      cpf: user.cpf,
      createdAt: user.createdAt.toISOString(),
      permissions: []
    });
  });
});

const createUser = async (): Promise<User> => {
  const userRepository = getRepository(User);
  const userData = userRepository.create({
    name: 'Fulano',
    cpf: '11122233344',
    password: '123123'
  });
  const user = await userRepository.save(userData);

  return user;
};

const createToken = (userId: string): string => {
  const token = new Auth().sign(userId);
  return token;
};
