const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('auth-router', () => {
  describe('Post /register', () => {
    it('should return 201 if success', async () => {
      const body = {username: "heber", password: "password"};
      const res = await request(server).post('/api/auth/register').send(body);
      expect(res.status).toBe(201);
    });
    it('should return 500 if duplicate username provided', async () => {
      const body = {username: "heber", password: "password"};
      const res = await request(server).post('/api/auth/register').send(body);

      const resDuplicate = await request(server).post('/api/auth/register').send(body);
      expect(resDuplicate.status).toBe(500);
    });
  });

  describe('Post /login', () => {
    it('should return "Invalid Credentials"', async () => {
      const body = {username: "notAuth", password: "password"}
      const res = await request(server).post('/api/auth/login').send(body);

      expect(res.body).toEqual({"message": "Invalid Credentials"});
    });

    it('should return 200 if successful login', async () => {
      const body = {username: "heber", password: "password"};
      await request(server).post('/api/auth/register').send(body);

      const res = await request(server).post('/api/auth/login').send(body);

      expect(res.status).toBe(200);
    });
  });
});

beforeEach(async () => {
  await db('users').truncate();
})