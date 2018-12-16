const logger = require('winston');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const SendEmail = require('../models/sendEmail');

dotenv.config();


class PersonDao {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Insere usuários no sistema
   * @param {*} personData
   */
  insertPerson(personData) {
    const hash = bcrypt.hashSync(personData.password, 10);
    logger.debug(hash);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO PERSON (name, document, email, password) VALUES ($1, $2, $3, $4)', [personData.name, personData.cpf, personData.email, hash], (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      }

      const message = '<b>Olá,</b><br>Este é o e-mail de confirmação para o seu cadastro na aplicação Estoqueando. Seja muito bem vindo(a)!<br>Por favor, acesse o link https://projetoestoqueando.blogspot.com/ para finalizar o seu cadastro. <br><br><font color="#FFD700"> Atenciosamente,<br><img src="https://ibb.co/jVPHaU">';
      new SendEmail(personData.email, 'Confirmação de Cadastro - Estoqueando').sendEmail(message);
      resolve(people);
    }));
  }

  /**
   * Busca usuário pelo e-mail
   * @param {*} email
   */
  findEmail(email) {
    logger.error(email);
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM PERSON WHERE email = $1', [email], (err, result) => {
      if (err) {
        logger.error(err);
        reject(err);
      }

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
      logger.debug(' *** RESPONSE SUCCESS DA FIND E-MAIL: ***');
      logger.debug(response.success);
      return (response.success);
    }));
  }

  /**
   * Busca o usuário pelo documento
   * @param {*} cpf
   */
  findCPF(cpf) {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM PERSON WHERE document = $1', [cpf], (err, result) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      const response = {};
      if (result.rows.length > 0) {
        response.message = 'Documento já cadastrado.';
        response.success = true;
        resolve(response);
      } else {
        response.message = 'Documento não cadastrado.';
        response.success = false;
        resolve(response);
      }
    }));
  }

  /**
   * Completar cadastro de usuário
   * @param {*} idPerson
   * @param {*} personData
   */
  updatePerson(idPerson, personData) {
    logger.debug(personData);
    return new Promise((resolve, reject) => this.connection.query('UPDATE PERSON SET name =$1, zip_code =$2, state =$3, city =$4, address =$5, number =$6 WHERE id_person =$7', [personData.name, personData.cep, personData.state, personData.city, personData.address, personData.number, idPerson], (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(people);
    }));
  }

  /**
   * Busca os dados de usuário pelo id
   * @param {*} idPerson
   */
  findPersonById(idPerson) {
    return new Promise((resolve, reject) => this.connection.query('SELECT name, genre, document as "cpf", email, zip_code as "cep", state, city, address, number, phone, photo FROM PERSON WHERE id_person = $1 ', [idPerson], (err, person) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        resolve(person.rows[0]);
      }
    }));
  }

  /**
   * Desabilita usuário
   * @param {int} id
   */
  disablePerson(id) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PERSON SET dt_removal = now() WHERE id_person = $1', [id], (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(people);
    }));
  }

  /**
   * Função que realiza a autenticação do usuário e retorna o JWT que será utilizado na sessão
   * @param {*} accessData
   */
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
            id: user.rows[0].id_person,
            token: jwt.sign({
              data: accessData.name,
            },
            process.env.SECRET, {
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


  passwordReminder(email) {
    const conexao = this.connection;
    let returningPassword = 0;
    let newPassword;

    if (this.findEmail(email) === true) {
      newPassword = Math.random().toString(36).slice(-10);
      const message = `<b>Olá,</b><br>Este é o e-mail para recuperação da senha do seu cadastro na aplicação Estoqueando. <br>Por favor, acesse o link https://www.estoqueando.com.br/ para finalizar o processo, faça login com a senha informada abaixo: <br>${newPassword}<br><br><font color="#FFD700"> Atenciosamente,<br><img src="https://ibb.co/jVPHaU">`;
      newPassword = bcrypt.hashSync(newPassword, 10);
      conexao.query('UPDATE PERSON SET password = $1 WHERE email = $2', [newPassword, email], (err) => {});
      new SendEmail(email, 'Recuperação de senha - Estoqueando').sendEmail(message);
    } else {
      logger.debug('deu false');
    }

    returningPassword = 123456;
    logger.debug(returningPassword);
  }
}
module.exports = PersonDao;
