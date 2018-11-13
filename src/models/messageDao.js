const logger = require('winston');

class MessageDao {
  constructor(connection) {
    this.connection = connection;
  }


  list(idPersonFrom, idPersonTo) {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM MESSAGE where id_person_from in ($1, $2) and id_person_to in ($1, $2)', [idPersonFrom, idPersonTo], (err, messages) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(messages);
    }));
  }

  addMessage(messageData) {
    logger.debug(messageData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO MESSAGE (id_conversa, id_person_from, id_person_to, message) VALUES ($1, $2, $3, $4, $5)', [messageData.idConversa, messageData.idPersonFrom, messageData.idPersonTo, messageData.message], (err, message) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(message);
      logger.error(err);
    }));
  }
}

module.exports = MessageDao;
