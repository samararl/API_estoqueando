const request = require('supertest');
const app = require('../../src/app');
const logger = require('winston');
const useradminController = require('../controllers/useradminController');

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
        .get('/useradmin/')
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    });

    
    test('It should return a list of useradmins and return (200)', () => {
        return request(app)
          .get('/useradmin/')
          .set('Authorization', `Bearer ${token.value}`)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
          });
    });
    
});


// POST EVALUATION
describe('POST /', () => {
    test('It should return error when insert an useradmin because it requires authorization (401)', (done) => {
    request(app).post('/useradmin/add')
        .send({
            useradminData: {
                name: 'Gerente Ray',
                login: 'gerenteRay',
                password: 'rayray',
                permision: 1
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

    test('It should return error when insert an useradmin because it will not validate the data (500) ' , (done) => {
    request(app).post('/useradmin/add')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
            useradminData: {
                name: 'Gerente Ray',
                login: 'gerenteRay',
                password: 'rayray',
                permision: 'cod'
            },
        })
        .set('Accept', 'application/json')
        .expect(500)
        .end((err) => {
        if (err) return done(err);
        done();
        });
    });

    test('It should return insert an useradmin with success' , (done) => {
    request(app).post('/useradmin/add')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
            useradminData: {
                name: 'Gerente Ray',
                login: 'gerenteRay',
                password: 'rayray',
                permision: 1
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


