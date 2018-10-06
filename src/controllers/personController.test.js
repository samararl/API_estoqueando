const request = require('supertest');
const app = require('../../src/app');

describe('Test person routes', () => {
  test('It should return error when create a person', (done) => {
    request(app).post('/public/createPerson')
      .send({
        personData: {
          email: 'teste@email.com',
          password: 's',
          cpf: '1234567',
          name: 'Teste Teste',
        },
      })
      .set('Accept', 'application/json')
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
  test('It should create a person with success', (done) => {
    request(app).post('/public/createPerson')
      .send({
        personData: {
          email: 'teste@email.com',
          password: 'testeteste',
          cpf: '1234567',
          name: 'Teste Teste',
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
  test('It should return 401 when get person list without token', (done) => {
    request(app).get('/person').then((response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });
});
