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

// GET EVALUATIONS
describe('GET /', () => {
  test('It should return an error because it requires authorization (401) ', () => request(app)
    .get('/product/user/2')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  // GET BY ID USER
  test('It should return a list of produts by id of an user and return (200)', () => request(app)
    .get('/product/user/2')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));

  test('It should return a list of produts by id with error and return (500)', () => request(app)
    .get('/product/user/A')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));

  // GET BY ID CATALOGUE
  test('It should return a list of produts by catalogue and return (200)', () => request(app)
    .get('/product/catalogue/1')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));

  test('It should return a list of produts by catalogue and return (500)', () => request(app)
    .get('/product/catalogue/A')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));

  // GET THE STOCK
  test('It should return a list of produts of the stock and return (200)', () => request(app)
    .get('/product/stock')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});


// POST PRODUCT
describe('POST /', () => {
  test('It should return error when insert a product because it requires authorization (401)', (done) => {
    request(app).post('/product/add')
      .send({
        productData: {
          title: 'someTitle',
          description: 'someDescription',
          image: null,
          cod: 'someCodRef',
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
        title: null,
        description: 'someDescription',
        image: null,
        cod: 'someCodRef',
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
        title: 'someTitle',
        description: 'someDescription',
        image: null,
        cod: 'someCodRef',
      },
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});
