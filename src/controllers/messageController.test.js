const request = require('supertest');
const app = require('../../src/app');

const token = {};

beforeAll(() => request(app)
  .post('/authenticate')
  .send({
    accessData: {
      email: 'samararochalipolis@gmail.com',
      password: 'samara',
    },
  })
  .set('Accept', 'application/json')
  .expect(200)
  .then((res) => {
    token.value = res.body.token;
  }));

describe('Message tests', () => {

});
