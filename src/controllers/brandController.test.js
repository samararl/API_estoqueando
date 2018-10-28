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

describe('GET /', () => {
  // token not being sent - should respond with a 401
  test('It should require authorization', () => request(app)
    .get('/brand/')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  // send the token - should respond with a 200
  test('It responds with JSON', () => request(app)
    .get('/brand/')
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});


/** ***** OUTRA TENTATIVA
const request = require('supertest');
const app = require('../../src/app');

const token;

beforeAll((done) => {
  request(app)
  .post('/authenticate')
  .send({
      accessData: {
        email: 'pri@gmail.com',
        password: 'pripri',
      }
  })
  .end((err, response) => {
    token = response.body.token;
    done();
  });
});

test('It responds with JSON', () => {
  return request(app)
  .get('/brand/')
  .set('Authorization', req.headers['x-access-token'])
  .then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.statusCode).toBe('application/json');
  });
});

/*
describe('Test brand routes', () => {
// **** adding brand ****
  // testing error
  test('It should return error when create a brand', (done) => {
    request(app).post('/brand/add')
      .send({
        brandData: {
          name: 'X',
          segment: 'Produtos plásticos',
          periodicity: 'mensal',
          description: 'Industria especializada em produtos de p
          lásticos, especialmente recipientes para utilização na conservação..',
        },
      })
      .set('Accept', 'application/json')
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // testing success
  test('It should create a brand with success', (done) => {
    request(app).post('/brand/add')
      .send({
        brandData: {
          name: 'Avon',
          segment: 'Produtos plásticos',
          periodicity: 'mensal',
          description: 'Industria especializada em produtos de
          plásticos, especialmente recipientes para utilização na conservação..',
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // **** getting brands ****
  // testing error
  test('It should return 401 when get brand list without token', (done) => {
    request(app).get('/brand').then((response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });

  // testing success (how to pass the token in the test?)
  test('It should return 200 when get brand list with token', (done) => {
    request(app).get('/brand').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  // **** uptading brands ****
  // **** disabling brands ****
});

*/
