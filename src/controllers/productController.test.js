const request = require('supertest');
const app = require('../../src/app');

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

// GET EVALUATIONS
describe('GET /', () => {
  test('It should return an error because it requires authorization (401) ', () => request(app)
    .get('/product/')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));


  test('It should return a list of produts and return (200)', () => request(app)
    .get('/product/')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});


// POST EVALUATION
describe('POST /', () => {
  test('It should return error when insert a product because it requires authorization (401)', (done) => {
    request(app).post('/product/add')
      .send({
        productData: {
          title: 'Batom',
          description: 'Batom mate',
          cod_ref: '80754',
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

test('It should return error when insert a product because it will not validate the data (500) ', (done) => {
  request(app).post('/product/add')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
      productData: {
        title: 'B',
        description: 'Batom mate',
        cod_ref: '80754',
      },
    })
    .set('Accept', 'application/json')
    .expect(500)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});

test('It should return insert a product with success', (done) => {
  request(app).post('/product/add')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
      productData: {
        title: 'Delineador',
        description: 'Delineador caneta',
        cod_ref: '80754',
      },
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});
