const logger = require('winston');

class ReminderDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT id_reminder AS id, id_person AS "id do usuário", reminder_text AS texto, date_ref AS "data referência", creation_date AS "data de criação", flag_check AS check FROM REMINDER', (err, reminders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(reminders);
    }));
  }

  insertReminder(reminderData) {
    logger.debug(reminderData);
    const creationDate = new Date();
    logger.debug(creationDate);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO REMINDER (id_person, reminder_text, date_ref, creation_date) VALUES ($1, $2, $3, $4)', [reminderData.idPerson, reminderData.reminderText, reminderData.dateRef, creationDate], (err, reminders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(reminders);
      logger.error(err);
    }));
  }

  updateReminder(id, reminderData) {
    logger.debug(id);
    logger.debug(reminderData);
    return new Promise((resolve, reject) => this.connection.query('UPDATE REMINDER SET reminder_text = $1, date_ref = $2, flag_check = $3 WHERE id_reminder = $4', [reminderData.reminder_text, reminderData.date_ref, reminderData.flag_check, id], (err, reminders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(reminders);
    }));
  }

  deleteReminder(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM REMINDER WHERE id_reminder = $1;', [id], (err, reminders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(reminders);
    }));
  }
}
module.exports = ReminderDao;
