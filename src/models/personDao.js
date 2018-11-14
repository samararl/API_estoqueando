const logger = require('winston');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SendEmail = require('../models/sendEmail');


class PersonDao {
  constructor(connection) {
    this.connection = connection;
  }


  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT id_person AS id, name AS nome, cpf AS CPF, email AS email, password AS senha, flag_consultant AS flag_consultora, genre AS sexo, cep AS CEP, uf AS UF, phone AS telefone, avarege_evaluation AS avaliação, photo AS foto FROM PERSON', (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(people);
    }));
  }

  insertPerson(personData) {
    const hash = bcrypt.hashSync(personData.password, 10);
    logger.debug(hash);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO PERSON (name, cpf, email, password, active) VALUES ($1, $2, $3, $4, $5 )', [personData.name, personData.cpf, personData.email, hash, 1], (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      new SendEmail(personData.email, 'Confirmação de Cadastro - Estoqueando')
        .sendEmail();
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

      const response = {};
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

      const response = {};
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
    return new Promise((resolve, reject) => this.connection.query('UPDATE PERSON SET name = $1, flag_premium = $2, genre = $3, cep = $4, uf = $5, phone = $6 WHERE id_person = $7', [personData.name, Number(personData.flagPremium), personData.genre, personData.cep, personData.uf, personData.phone, idPerson], (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        resolve(people);
      }
    }));
  }

  findPersonById(idPerson) {
    return new Promise((resolve, reject) => this.connection.query('SELECT name, flag_consultant as "consultant",flag_premium as "flagPremium",cpf, email, cep, uf, phone FROM PERSON WHERE id_person = $1 ', [idPerson], (err, person) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        resolve(person.rows[0]);
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
            name: user.rows[0].name,
            id: user.rows[0].id_person,
            token: jwt.sign({
                data: accessData.name,
              },
              'segredo', {
                expiresIn: 60 * 60,
              }),

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