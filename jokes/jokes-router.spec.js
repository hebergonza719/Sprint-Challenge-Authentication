const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('jokes-router', () => {
  describe('get /api/jokes', () => {
    it('should return 500 if fail', async () => {
      const res = await request(server)
      .get('/api/jokes');
      expect(res.status).toBe(401);
    });

    it('should return 200 if successful', async () => {
      const body = {username: "heber", password: "password"};
      await request(server).post('/api/auth/register').send(body);

      const resLogin = await request(server)
        .post('/api/auth/login')
        .send(body);

      const token = resLogin.body.jwt_token;
      // console.log(token);
      const resJokes = await request(server)
        .get('/api/jokes')
        .set('authorization', token);

      expect(resJokes.status).toBe(200);
    });
  });
});


beforeEach(async () => {
  await db('users').truncate();
})