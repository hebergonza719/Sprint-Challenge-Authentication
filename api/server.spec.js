const request = require('supertest');
const server = require('./server.js');

describe('server', () => {
  it('should set the testing env', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('Get /', () => {
    it('should return 200 with async/await', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });

    it('should return {api: running', async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ api: "running" });
    });
  });
});