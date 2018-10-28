const request = require('supertest');
const app = require('../../src/app');
const logger = require('winston');
const evaluationController = require('../controllers/evaluationController');


beforeAll(() => request(app)
  .post('/authenticate')
  .send({
    accessData: {
      email: 'pri@gmail.com',
      password: 'pripri',
    },
  })
  .set('Accept', 'application/json')
  .expect(200)
  .then((res) => {
    token.value = res.body.token;
  }));


// GET EVALUATIONS
describe('GET /', () => {
    test('It should return an error because it requires authorization (401) ', () => {
      return request(app)
        .get('/evaluation/')
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    });

    
    test('It should return a list of evaluation and return (200)', () => {
        return request(app)
          .get('/evaluation/')
          .set('Authorization', `Bearer ${token.value}`)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
          });
    });
    
});


// POST EVALUATION
describe('POST /', () => {
    test('It should return error when insert a catalogue because it requires authorization (401)', (done) => {
    request(app).post('/evaluation/add')
        .send({
            evaluationData: {
                id_person: 1,
                id_purchaseorder: 1,
                evaluation: 10,
                comments: 'Atendimento muito bom',
                date_ref: '15/09/2018'
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

    test('It should return error when insert a evaluation because it will not validate the data (500) ' , (done) => {
    request(app).post('/evaluation/add')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
            evaluationData: {
                id_person: 'cod',
                id_purchaseorder: 1,
                evaluation: 10,
                comments: 'Atendimento muito bom',
                date_ref: '15/09/2018'
            },
        })
        .set('Accept', 'application/json')
        .expect(500)
        .end((err) => {
        if (err) return done(err);
        done();
        });
    });

    test('It should return insert a catalogue with success' , (done) => {
    request(app).post('/evaluation/add')
    .set('Authorization', `Bearer ${token.value}`)
        .send({
            evaluationData: {
                id_person: 1,
                id_purchaseorder: 1,
                evaluation: 10,
                comments: 'Atendimento muito bom',
                date_ref: '2018-01-01:00:00:00.000Z'
            },
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err) => {
        if (err) return done(err);
        done();
        });
    });

//PUT - UPDATE CATALOGUE - verificar como testar passagem por parâmetro

//PUT - DISABLE CATALOGUE


