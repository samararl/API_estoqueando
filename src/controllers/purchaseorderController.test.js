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
    .get('/purchaseorder/')
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
  test('It should return error when insert a purchaseorder because it requires authorization (401)', (done) => {
    request(app).post('/purchaseorder/add')
      .send({
        purchaseorderData: {
          id_consultant: 1,
          id_client: 3,
          order_date: '10/09/2018',
          total_price: 40,
          sales_date: '12/09/2018',
          status: 'Em separação',
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

test('It should return error when insert a purchaseorder because it will not validate the data (500) ', (done) => {
  request(app).post('/purchaseorder/add')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
      purchaseorderData: {
        id_consultant: 'cod',
        id_client: 3,
        order_date: '10/09/2018',
        total_price: 40,
        sales_date: '12/09/2018',
        status: 'Em separação',
      },
    })
    .set('Accept', 'application/json')
    .expect(500)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});

test('It should return insert a purchaseorder with success', (done) => {
  request(app).post('/purchaseorder/add')
    .set('Authorization', `Bearer ${token.value}`)
    .send({
      purchaseorderData: {
        id_consultant: 1,
        id_client: 3,
        order_date: '10/09/2018',
        total_price: 40,
        sales_date: '12/09/2018',
        status: 'Em separação',
      },
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      done();
    });
});
