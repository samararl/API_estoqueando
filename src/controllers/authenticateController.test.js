const request = require('supertest');
const app = require('../../src/app');

describe('Test authenticate route', () => {
  test('It should return 401 when authenticate with invalid data', (done) => {
    request(app).post('/authenticate').send({
      accessData: {
        email: 'samararochalipolis@gmail.com',
        password: 's',
      },
    })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
  test('It should return 200 when authenticate with valid data', (done) => {
    request(app).post('/authenticate')
      .send({
        accessData: {
          email: 'samararochalipolis@gmail.com',
          password: 'samara',
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
        return false;
      });
  });
});
