import Database from '../database/database';
import request from 'supertest';
import { app, server } from '../index';

describe("Auth", () => {
  afterAll(async () => {
    const database = new Database();
    database.disconnect();

    await server.close();
  });

  it('Should be able to authenticate a user', async () => {
    const userTest = {
      email: 'auth.user@test.com',
      name: 'User Test',
      password: 'passwd',
    };

    const response = await request(app).post('/api/register').send(userTest);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('auth');
    expect(response.body).toHaveProperty('id');
    expect(response.body.auth).toBe(true);

    const wrongAuthResponse = await request(app).post('/api/login').send({
      email: 'auth.user@test.com'
    });
    expect(wrongAuthResponse.status).toBe(401);

    const authResponse = await request(app).post('/api/login').send(userTest);
    expect(authResponse.status).toBe(200);
    expect(authResponse.body).toHaveProperty('token');
    expect(authResponse.body).toHaveProperty('auth');
    expect(authResponse.body).toHaveProperty('id');
    expect(authResponse.body.auth).toBe(true);

    const destroyResponse = await request(app).delete(`/api/users/${response.body.id}/destroy`);
    expect(destroyResponse.status).toBe(200);
    expect(destroyResponse.body).toHaveProperty('deleted');
    expect(destroyResponse.body.deleted).toHaveProperty('deletedCount');
    expect(destroyResponse.body.deleted.deletedCount).toBe(1);
  });
});
