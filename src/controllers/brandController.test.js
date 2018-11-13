const request = require('supertest');
const logger = require('winston');
const app = require('../../src/app');
const brandController = require('../controllers/brandController');

/*
beforeAll((done) => {
  const token;
  request(app)
 new PersonDao(req.connection)
    .authenticatePerson(req.body.accessData)
  .post('/authenticate')
  .send({
    accessData: {
        email: 'pri@gmail.com',
        password: 'pripri'
      }
  })
  .end((err, response) => {
    token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzg5NTQzNTgsImV4cCI6MTUzODk1Nzk1OH0.MI8CCsBulqj3Gv_X9zEf63bPf4tqpXEcjtRvwF_tdl4,
    //token = response.body.token;
    done();
  });
});
*/

// GET BRAND
describe('GET /', () => {
  test('It should return an error because it requires authorization (401) ', () => request(app)
    .get('/brand/')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));


  test('It should return a list of brands and return (200)', () => request(app)
    .get('/brand/')
    .set('Authorization', `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzg5NjkzMzAsImV4cCI6MTUzODk3MjkzMH0.af2I8JHupPhcFsssLI7gI5z-0qLSKjLvBOi4lR1uXgg'}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});


// POST BRAND
describe('POST /', () => {
  test('It should return error when insert a brand because it requires authorization (401)', (done) => {
    request(app).post('/brand/add')
      .send({
        brandData: {
          name: 'Tuppweware',
          segment: 'Produtos plásticos',
          periodicity: 'mensal',
          description: 'Industria especializada em produtos de plásticos, especialmente recipientes para utilização na conservação..',
        },
      })
      .set('Accept', 'application/json')
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('It should return error when insert a brand because it will not validate the data (500) ', (done) => {
    request(app).post('/brand/add')
      .set('Authorization', `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzg5NjkzMzAsImV4cCI6MTUzODk3MjkzMH0.af2I8JHupPhcFsssLI7gI5z-0qLSKjLvBOi4lR1uXgg'}`)
      .send({
        brandData: {
          name: 'T',
          segment: 'Produtos plásticos',
          periodicity: 'mensal',
          description: 'Industria especializada em produtos de plásticos, especialmente recipientes para utilização na conservação..',
        },
      })
      .set('Accept', 'application/json')
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });


  test('It should return insert a brand with success', (done) => {
    request(app).post('/brand/add')
      .set('Authorization', `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzg5NjkzMzAsImV4cCI6MTUzODk3MjkzMH0.af2I8JHupPhcFsssLI7gI5z-0qLSKjLvBOi4lR1uXgg'}`)
      .send({
        brandData: {
          name: 'Tupperware',
          segment: 'Produtos plásticos',
          periodicity: 'Mensal',
          description: 'Industria especializada em produtos de plásticos, especialmente recipientes para utilização na conservação..',
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
