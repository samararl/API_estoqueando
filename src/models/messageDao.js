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

  listMessageByPerson(id) {
    return new Promise((resolve, reject) => this.connection.query('select B.name, id_person_from as "personFrom" from message A inner join person B on a.id_person_from = B.id_person where id_person_to = $1 and A.dt_removal is null group by (id_person_from, B.name)', [id], (err, messages) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(messages.rows);
    }));
  }

  getChat(personTo, personFrom) {
    return new Promise((resolve, reject) => this.connection.query('select B.name, A.* from message A inner join person B on a.id_person_from = B.id_person where id_person_to in($1,$2) and id_person_from in ($2,$1) and A.dt_removal is null order by dt_msg', [personTo, personFrom], (err, messages) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(messages.rows);
    }));
  }

  /**
   * Insere mensagem de contato
   * @param {*} messageData
   */
  addMessage(messageData) {
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO MESSAGE (id_conversation, id_person_from, id_person_to, message) VALUES ($1, $2, $3, $4)', [messageData.idConversation, messageData.personFrom, messageData.personTo, messageData.message], (err, message) => {
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
