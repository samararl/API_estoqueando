const request = require('supertest');
const app = require('../../src/app');

const token = {};
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


// POST EVALUATION
describe('POST /', () => {
  test('It should return error when insert a reminder because it requires authorization (401)', (done) => {
    request(app).post('/reminder/add')
      .send({
        reminderData: {
          id_person: 1,
          reminder_text: 'Levar o batom da Mari',
          date_ref: '10/09/2018',
          flag_check: 1,
        },
      })
      .set('Accept', 'application/json')
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

test('It should return error when insert a reminder because it will not validate the data (500) ', (done) => {
  request(app).post('/reminder/add')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
      reminderData: {
        id_person: 'cod',
        reminder_text: 'Levar o batom da Mari',
        date_ref: '10/09/2018',
        flag_check: 1,
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
        id_person: 1,
        reminder_text: 'Levar o batom da Mari',
        date_ref: '10/09/2018',
        flag_check: 1,
      },
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});