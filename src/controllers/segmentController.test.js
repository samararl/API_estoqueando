const request = require('supertest');
const app = require('../../src/app');

const token = {};

beforeAll(() => request(app)
  .post('/authenticate')
  .send({
    accessData: {
      email: 'ju@gmail.com',
      password: 'jujuju',
    },
  })
  .set('Accept', 'application/json')
  .expect(200)
  .then((res) => {
    token.value = res.body.token;
  }));

describe('GET segments', () => {
  test('It should return an error because it requires authorization (401) ', () => request(app)
    .get('/segment/')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));


  test('It should return a list of segments and return (200)', () => request(app)
    .get('/segment/')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});
