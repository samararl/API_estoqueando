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

// GET CATALOGUES
describe('GET /', () => {
  test('It should return an error because it requires authorization (401) ', () => request(app)
    .get('/catalogue/')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));


  test('It should return a list of catalogues and return (200)', () => request(app)
    .get('/catalogue/')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});


// POST CATALOGUE
describe('POST /', () => {
  test('It should return error when insert a catalogue because it requires authorization (401)', (done) => {
    request(app).post('/catalogue/add')
      .send({
        catalogueData: {
          id_brand: 4,
          period_ref: 3,
          year_ref: 2017,
          description_ref: 'Dia dos pais',
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

test('It should return error when insert a catalogue because it will not validate the data (500) ', (done) => {
  request(app).post('/catalogue/add')
    .set('Authorization', `Bearer  ${token.value}`)
    .send({
      catalogueData: {
        id_brand: 'cod',
        period_ref: 3,
        year_ref: 2017,
        description_ref: 'Dia dos pais',
      },
    })
    .set('Accept', 'application/json')
    .expect(500)
    .end((err) => {
      if (err) return done(err);
      return true;
      done();
    });
});

test('It should return insert a catalogue with success', (done) => {
  request(app).post('/catalogue/add')
    .set('Authorization', `Bearer  ${token.value}`)
    .send({
      catalogueData: {
        id_brand: 4,
        period_ref: 3,
        year_ref: 2017,
        description_ref: 'Dia dos pais',
      },
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      return true;
      done();
    });
});
