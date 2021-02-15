/* eslint-disable no-undef */
import '../utils/env';
import supertest from 'supertest';
import app from '../app';
import Database from '../database/connection';
import { getRepository } from 'typeorm';
import { User } from '../app/models/User';

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

describe('POST /sessions', () => {
  test('should return error when not sending required params', async () => {
    const response = await request.post('/sessions').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);
  });

  test('should return error when sending data from unexisting user', async () => {
    const response = await request.post('/sessions').send({
      cpf: '33495830484',
      password: '123123'
    });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '001',
      message: 'Credenciais inválidas'
    });
  });

  test('should return error when sending wrong password', async () => {
    const userRepository = getRepository(User);
    const userData = userRepository.create({
      name: 'Fulano',
      cpf: '11122233344',
      password: '123123'
    });

    const user = await userRepository.save(userData);

    const response = await request.post('/sessions').send({
      cpf: user.cpf,
      password: 'ABC123'
    });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toEqual({
      code: '002',
      message: 'Credenciais inválidas'
    });
  });

  test('should create a new session', async () => {
    const userRepository = getRepository(User);
    const userData = userRepository.create({
      name: 'Fulano',
      cpf: '11122233344',
      password: '123123'
    });

    const user = await userRepository.save(userData);

    const response = await request.post('/sessions').send({
      cpf: user.cpf,
      password: '123123'
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('isAdmin');
    expect(response.body.userId).toBe(user.id);
    expect(response.body).toMatchObject({
      userId: user.id,
      isAdmin: false
    });
  });
});
