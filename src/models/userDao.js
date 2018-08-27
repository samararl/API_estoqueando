const logger = require('winston');
const jwt = require('jsonwebtoken');

class UserDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM teste', (err, users) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(users);
    }));
  }

  insertTeste(userData) {
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO teste (nome) VALUES ($1)', [userData.nome], (err, users) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(users);
    }));   
  }

  authenticateUser(userData) {
    logger.debug('Autenticando usuário');

    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM usuario where nome =  $1', [userData.name], (error, user) => {
      if (error) {
        logger.error(`Autenticação falhou : ${error}`);
        reject(error);
      }

      if (user.rows.length > 0) {
        logger.debug('Usuário autenticado');

        if (user.rows[0].senha !== userData.password) {
          reject(error);
        } else {
          const response = {
            success: true,
            message: 'Token criado',
            token: jwt.sign(
              { nome: userData.name },
              'teste',
              { expiresIn: 180 },
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
module.exports = UserDao;
