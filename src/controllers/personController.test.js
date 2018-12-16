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


// GET
describe('GET /', () => {
  // GET PERSON BY ID
  test('It should return an error because it requires authorization (401) ', () => request(app)
    .get('/person/5')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  test('It should return an error because it it will not validate the data (500) ', () => request(app)
    .get('/person/a')
    .then((response) => {
      expect(response.statusCode).toBe(500);
    }));

  test('It should return a list person by id with success and return (200)', () => request(app)
    .get('/person/5')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));

  // FIND EMAIL
  test('It should return an error when find e-mail because it requires authorization (401) ', () => request(app)
    .get('/public/findEmail/ju@gmail.com')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  test('It should return if the e-mail is already with success and return (200)', () => request(app)
    .get('/public/findEmail/ju@gmail.com')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));

  // FIND CPF
  test('It should return an error when find CPF because it requires authorization (401) ', () => request(app)
    .get('/public/findCPF/999.999.999-99')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));

  test('It should return if the CPF exists with success and return (200)', () => request(app)
    .get('/public/findCPF/999.999.999-99')
    .set('Authorization', `Bearer ${token.value}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});


// POST PERSON
describe('POST /', () => {
  test('It should return error when insert a brand because it requires authorization (401)', (done) => {
    request(app).post('/public/createPerson')
      .send({
        personData: {
          name: 'Usuário teste',
          cpf: '999.999.999-99',
          email: 'teste@gmail.com',
          password: 'testeteste',
        },
      })
      .set('Accept', 'application/json')
      .expect(401)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('It should return error when insert a person because it will not validate the data (500) ', (done) => {
    request(app).post('/public/createPerson')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        personData: {
          name: 'T',
          cpf: '999.999.999-99',
          email: 'teste@gmail.com',
          password: 'testeteste',
        },
      })
      .set('Accept', 'application/json')
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });


  test('It should return insert a person with success', (done) => {
    request(app).post('/public/createPerson')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        personData: {
          name: 'Usuário teste',
          cpf: '999.999.999-99',
          email: 'teste@gmail.com',
          password: 'testeteste',
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });


  // PUT PERSON
  test('It should update a person with success', (done) => {
    request(app).put('/person/1')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        personData: {
          name: 'Rayane Araujo',
          photo: null,
          phone: '960995487',
          zipCode: '05110012',
          state: 'MG',
          city: 'Mininhas do Sul',
          address: 'Rua Teste de Minas',
          number: '135B',
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('It should update a person with error', (done) => {
    request(app).put('/person/1')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        personData: {
          name: 'Rayane Araujo',
          photo: null,
          phone: '960995487',
          zipCode: '05110012',
          state: 'Minas Gerais',
          city: 'Mininhas do Sul',
          address: 'Rua Teste de Minas',
          number: '135B',
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // DISABLE A PERSON
  test('It should disable a person with success', (done) => {
    request(app).put('/person/disable/1')
      .set('Authorization', `Bearer ${token.value}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('It should disable a person with error', (done) => {
    request(app).put('/person/disable/A')
      .set('Authorization', `Bearer ${token.value}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // PASSWORD REMINDER
  test('It should return error when send the e-mail with the password because it will not validate the data (500) ', (done) => {
    request(app).post('/public/passwordReminder/testeerroXXX')
      .set('Authorization', `Bearer ${token.value}`)
      .set('Accept', 'application/json')
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  test('It should return the sent e-mail with success', (done) => {
    request(app).post('/public/passwordReminder/ray.araujom@gmail.com')
      .set('Authorization', `Bearer ${token.value}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
