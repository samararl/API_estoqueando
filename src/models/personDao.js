const logger = require('winston');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 25,
  secure: true,
  auth: {
    user: 'ifspestoqueando@gmail.com',
    pass: '********',
  },
  tls: { rejectUnauthorized: false },
});

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

      /* const HelperOptions = {
        form: '"Estoqueando" <ifspestoqueando@gmail.com>',
        to: personData.email,
        subject: 'Confirmação de cadastro Estoqueando',
        html: '<b>Olá,</b><br>Este é o e-mail de confirmação para o seu cadastro na aplicação Estoqueando. Seja muito bem vindo(a)!<br>Por favor, acesse o link https://projetoestoqueando.blogspot.com/ para finalizar o seu cadastro. <br><br><font color="#FFD700"> Atenciosamente,<br><img src="https://ibb.co/jVPHaU">',
        // html: readFile(emailconfirmacao)
      };
      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log(`The message was sent: ${info.response}`);
        console.log(info);
      }); */
      resolve(people);
    }));
  }


  // vvvv **** VER COMO TRATAR NA MESMA FUNÇÃO ****** vvv
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
  // ^^^^^ **** VER COMO TRATAR NA MESMA FUNÇÃO ****** ^^^^^

  updatePerson(id, personData) {
    const hash = bcrypt.hashSync(personData.password, 10);
    return new Promise((resolve, reject) => this.connection.query('UPDATE PERSON SET name = $1, cpf = $2, email = $3, password = $4, flag_consultant = $5, flag_premium = $6, genre = $7, cep = $8, uf = $9, phone = $10, avarege_evaluation = $11, photo = $12 WHERE id_person = $13', [personData.name, personData.cpf, personData.email, hash, personData.flag_consultant, personData.flag_premium, personData.genre, personData.cep, personData.uf, personData.phone, personData.avarege_evaluation, personData.photo, id], (err, people) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(people);
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
