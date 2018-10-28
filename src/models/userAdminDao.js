const logger = require('winston');
const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');


/* COLOCAR EM OUTRO LUGAR E SÓ CHAMAR AQUI
let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 25,
  secure: true,
  auth: {
    user: "ifspestoqueando@gmail.com",
    pass: "****"
  },
  tls: { rejectUnauthorized: false }
});
*/
class UserAdminDao {
  constructor(connection) {
    this.connection = connection;
  }


  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM USERADMIN', (err, usersadmin) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(usersadmin);
    }));
  }

  insertUseradmin(userAdminData) {
    logger.debug(userAdminData);
    const active = 1;

    const hash = bcrypt.hashSync(userAdminData.password, 10);
    logger.debug(hash);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO USERADMIN (name, login, password, permision, active) VALUES ($1, $2, $3, $4, $5)', [userAdminData.name, userAdminData.login, hash, userAdminData.permision, active], (err, usersadmin) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(usersadmin);
    }));
  }

  updateUseradmin(id, userAdminData) {
    const hash = bcrypt.hashSync(userAdminData.password, 10);
    return new Promise((resolve, reject) => this.connection.query('UPDATE USERADMIN SET name = $1, login = $2, password = $3, permision = $4 WHERE id_useradmin = $5', [userAdminData.name, userAdminData.login, hash, userAdminData.permision, id], (err, usersadmin) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(usersadmin);
    }));
  }

  disableUseradmin(id) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE USERADMIN SET active = 0 WHERE id_useradmin = $1', [id], (err, usersadmin) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(usersadmin);
    }));
  }
}
module.exports = UserAdminDao;
