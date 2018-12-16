const request = require('supertest');
const logger = require('winston');
const app = require('../../src/app');
const extractController = require('../controllers/extractController');

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

// POST EXTRACTION --------- VER POSTMAN EXTRACT
describe('POST /', () => {
  test('It should return error when insert an extraction because it requires authorization (401)', (done) => {
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
      .set('Authorization', `Bearer ${token.value}`)
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
      .set('Authorization', `Bearer ${token.value}`)
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
