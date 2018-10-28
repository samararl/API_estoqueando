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

describe('Person tests', () => {
  test('It should require authorization when get person without token', (done) => {
    request(app).get('/person').then((response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });
  test('It should faild authorization when get person with wrong token', (done) => {
    request(app)
      .get('/person')
      .set('Authorization', `Bearer ${token.value}1`)
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });
  test('should return persons when with Authorization valid token', (done) => {
    request(app)
      .get('/person')
      .set('Authorization', `Bearer ${token.value}`)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
        return false;
      });
  });
  test('should return SUCCESS when e-mail exists in database', (done) => {
    request(app)
      .get('/person/findEmail/samararochalipolis@gmail.com')
      .set('Authorization', `Bearer ${token.value}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(true);
        done();
        return false;
      });
  });
  test('should return SUCCESS when e-mail dont exists in database', (done) => {
    request(app)
      .get('/person/findEmail/samar@gmail.com')
      .set('Authorization', `Bearer ${token.value}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(false);
        done();
        return false;
      });
  });
  test('should return SUCCESS when CPF exists in database', (done) => {
    request(app)
      .get('/person/findCPF/37309768850')
      .set('Authorization', `Bearer ${token.value}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(true);
        done();
        return false;
      });
  });
  test('should return ERROR when send an invalid parameter', (done) => {
    request(app)
      .get('/person/findEmail/')
      .set('Authorization', `Bearer ${token.value}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(false);
        done();
        return false;
      });
  });
  test('should return SUCCESS when CPF dont exists in database', (done) => {
    request(app)
      .get('/person/findCPF/12345678900')
      .set('Authorization', `Bearer ${token.value}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(false);
        done();
        return false;
      });
  });
  test('should return SUCCESS when disable a person', (done) => {
    request(app)
      .put('/person/disable/1')
      .set('Authorization', `Bearer ${token.value}`)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        // expect(res.body.success).toBe(false);
        done();
        return false;
      });
  });
  test('should return ERROR 500 when disable a person with worng parameter', (done) => {
    request(app)
      .put('/person/disable/abc')
      .set('Authorization', `Bearer ${token.value}`)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        // expect(res.body.success).toBe(false);
        done();
        return false;
      });
  });
  test('should return SUCCESS when update person data', (done) => {
    request(app)
      .put('/person/1')
      .set('Authorization', `Bearer ${token.value}`)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        // expect(res.body.success).toBe(false);
        done();
        return false;
      });
  });
  test('should return SUCESS 200 when insert person with valid data', (done) => {
    request(app)
      .post('/public/createPerson')
      .send({
        personData: {
          email: 'testeabc@gmail.com',
          password: 'samara',
          name: 'samara rocha',
          cpf: '37309768854',
        },
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(true);
        done();
        return false;
      });
  });
  test('should return ERROR 500 when insert person with invalid data', (done) => {
    request(app)
      .post('/public/createPerson')
      .send({
        personData: {
          email: 'testeabc',
          password: true,
          name: 's',
          cpf: '37309768854',
        },
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(false);
        done();
        return false;
      });
  });
});
