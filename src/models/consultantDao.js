const logger = require('winston');

const bcrypt = require('bcrypt');

const saltRounds = 10;

class ConsultantDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM CONSULTANT', (err, consultants) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(consultants);
    }));
  }

  insertConsultant(consultantData) {
    logger.debug(consultantData);
    let password = consultantData.password;

    const hash = bcrypt.hashSync(consultantData.password, 10);
    logger.debug(hash);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO CONSULTANT (name, cpf, email, password) VALUES ($1, $2, $3, $4)', [consultantData.name, consultantData.cpf, consultantData.email, hash], (err, consultants) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(consultants);
    }));
  }
}
module.exports = ConsultantDao;
