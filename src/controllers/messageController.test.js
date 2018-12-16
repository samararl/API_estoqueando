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

// SEND MESSAGE
describe('POST /', () => {
  test('It should return error when send a message because it requires authorization (401)', (done) => {
    request(app).post('/message/add')
      .send({
        messageData: {
          idConversation: 1,
          personFrom: 2,
          personTo: 1,
          message: 'Olá, tudo bem?',
        },
      })
      .set('Accept', 'application/json')
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('It should return error when send a message because it will not validate the data (500) ', (done) => {
    request(app).post('/message/add')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        messageData: {
          idConversationnn: 'cod',
          personFrom: 2,
          personTo: 1,
          message: 'Olá, tudo bem?',
        },
      })
      .set('Accept', 'application/json')
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });


  test('It should return message sent with success', (done) => {
    request(app).post('/message/add')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        messageData: {
          idConversation: 1,
          personFrom: 2,
          personTo: 1,
          message: 'Olá, tudo bem?',
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
