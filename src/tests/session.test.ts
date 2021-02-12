/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('POST /sessions', () => {
  test('should return error when not sending required params', async () => {
    const response = await request.post('/sessions').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);
  });
});
