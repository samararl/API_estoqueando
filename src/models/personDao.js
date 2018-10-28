const logger = require('winston');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailBusiness = require('../business/emailBusiness');


class PersonDao {
  constructor(connection) {
    this.connection = connection;
  }


  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM PERSON', (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(people);
    }));
  }

  insertPerson(personData) {
    logger.debug(personData);
    const active = 1;

    const hash = bcrypt.hashSync(personData.password, 10);
    logger.debug(hash);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO PERSON (name, cpf, email, password, active) VALUES ($1, $2, $3, $4, $5 )', [personData.name, personData.cpf, personData.email, hash, active], (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      new emailBusiness(this.connection)
        .sendEmail(personData.email)
      resolve(people);
    }));
  }


  findEmail(email) {
    logger.error(email);
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM PERSON WHERE email = $1', [email], (err, result) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      logger.error(result);

      const response = { };
      if (result.rows.length > 0) {
        response.message = 'E-mail já cadastrado.';
        response.success = true;
        logger.debug('E-mail já cadastrado');
        resolve(response);
      } else {
        response.message = 'E-mail não cadastrado.';
        response.success = false;
        resolve(response);
        logger.debug('E-mail não cadastrado');
      }
    }));
  }

  findCPF(cpf) {
    logger.error(cpf);
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM PERSON WHERE cpf = $1', [cpf], (err, result) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      logger.error(result);

      const response = { };
      if (result.rows.length > 0) {
        response.message = 'CPF já cadastrado.';
        response.success = true;
        resolve(response);
      } else {
        response.message = 'CPF não cadastrado.';
        response.success = false;
        resolve(response);
      }
    }));
  }

  updatePerson(idPerson, personData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PERSON SET name = $1, flag_consultant = $2, flag_premium = $3, genre = $4, cep = $5, uf = $6, phone = $7 WHERE id_person = $8', [personData.name, Number(personData.flagConsultant), Number(personData.flagPremium), personData.genre, personData.cep, personData.uf, personData.phone, idPerson], (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        resolve(people);
      }
    }));
  }

  disablePerson(id) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PERSON SET active = 0 WHERE id_person = $1', [id], (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(people);
    }));
  }

  authenticatePerson(accessData) {
    logger.debug('Autenticando usuário');
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM PERSON where email =  $1', [accessData.email], (error, user) => {
      if (error) {
        logger.error(`Autenticação falhou : ${error}`);
        reject(error);
      }

      if (user.rows.length > 0) {
        logger.debug(`Usuário existente ${user.rows[0].name}`);
        if (!bcrypt.compareSync(accessData.password, user.rows[0].password)) {
          reject(error);
        } else {
          const response = {
            success: true,
            message: 'Token criado',
            token: jwt.sign(
              { data: accessData.name },
              process.env.SECRET,
              { expiresIn: 60 * 60 },
            ),

          };
          resolve(response);
        }
      } else {
        reject(error);
      }
    }));
  }
}
module.exports = PersonDao;
