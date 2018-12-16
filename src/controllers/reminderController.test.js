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

describe('GET /', () => {
  test('It should return an error because it requires authorization (401) ', () => request(app)
    .get('/reminder/')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  test('It should return a list of reminders and return (200)', () => request(app)
    .get('/reminder/')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});


// POST REMINDER
describe('POST /', () => {
  test('It should return error when insert a brand because it requires authorization (401)', (done) => {
    request(app).post('/reminder/add')
      .send({
        reminderData: {
          idPurchaseOrder: 5,
          reminderText: 'Lançar pedido para vender no evento Y',
          dateRef: '28/10/2018',
        },
      })
      .set('Accept', 'application/json')
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('It should return error when insert a reminder because it will not validate the data (500) ', (done) => {
    request(app).post('/reminder/add')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        reminderData: {
          idPurchaseOrder: 'cod',
          reminderText: 'Lançar pedido para vender no evento Y',
          dateRef: '28/10/2018',
        },
      })
      .set('Accept', 'application/json')
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });


  test('It should return insert a reminder with success', (done) => {
    request(app).post('/reminder/add')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        reminderData: {
          idPurchaseOrder: 5,
          reminderText: 'Lançar pedido para vender no evento Y',
          dateRef: '28/10/2018',
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });


  // PUT BRAND
  describe('PUT /', () => {
    test('It should update a reminder with success', (done) => {
      request(app).put('/reminder/1')
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          reminderData: {
            reminderText: 'Levar o batom da Samara',
            dtRef: '28/08/2018',
          },
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    test('It should update a reminder with error', (done) => {
      request(app).put('/reminder/1')
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          reminderData: {
            reminderText: 'Levar o batom da Samara',
            dtRef: 'data',
          },
        })
        .set('Accept', 'application/json')
        .expect(500)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
