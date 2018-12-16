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
    .get('/evaluation/')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));


  test('It should return a list of evaluations and return (200)', () => request(app)
    .get('/evaluation/')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});


describe('POST /', () => {
  test('It should return error when insert a catalogue because it requires authorization (401)', (done) => {
    request(app).post('/evaluation/add')
      .send({
        evaluationData: {
          idConsultant: 1,
          idClient: 2,
          evaluation: 10,
          comment: 'Atendimento muito bom',
          dtEvaluation: '15-09-2018',
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

test('It should return error when insert a evaluation because it will not validate the data (500) ', (done) => {
  request(app).post('/evaluation/add')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
      evaluationData: {
        idConsultant: 'cod',
        idClient: 2,
        evaluation: 10,
        comment: 'Atendimento muito bom',
        dtEvaluation: '15-09-2018',
      },
    })
    .set('Accept', 'application/json')
    .expect(500)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});

test('It should return insert a catalogue with success', (done) => {
  request(app).post('/evaluation/add')
    .set('Authorization', `Bearer  ${token.value}`)
    .send({
      evaluationData: {
        idConsultant: 1,
        idClient: 2,
        evaluation: 10,
        comment: 'Atendimento muito bom',
        dtEvaluation: '15-09-2018',
      },
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});

test('It should update an evaluation with success', (done) => {
  request(app).put('/evaluation/2')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
      evaluationData: {
        idConsultant: 1,
        idClient: 2,
        evaluation: 7,
        comment: 'Mais ou menos',
        dtEvaluation: '15-09-2018',
      },
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});


test('It should update an evaluation with error', (done) => {
  request(app).put('/evaluation/2')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
      evaluationData: {
        idConsultantttt: 1,
        idClient: 2,
        evaluation: 7,
        comment: 'Mais ou menos',
        dtEvaluation: '15-09-2018',
      },
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});
