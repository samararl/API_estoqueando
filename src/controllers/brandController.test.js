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
    .get('/message/')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  test('It should return a list of brands and return (200)', () => request(app)
    .get('/brand/')
    .set('Authorization', `Bearer ${token.value}`)
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
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        brandData: {
          name: 'T',
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
  test('It should update a brand with success', (done) => {
    request(app).put('/brand/1')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        brandData: {
          name: 'Tupperware 2',
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('It should update a brand with error', (done) => {
    request(app).put('/brand/1')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        brandData: {
          nameee: 'Tupperware 2',
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
