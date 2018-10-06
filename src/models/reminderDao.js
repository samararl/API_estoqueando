const logger = require('winston');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class ReminderDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM REMINDER', (err, reminders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(reminders);
    }));

  }

  insertReminder(reminderData) {
    logger.debug(reminderData);
    var creation_date = new Date();
    logger.debug(creation_date);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO REMINDER (id_person, reminder_text, date_ref, creation_date, flag_check) VALUES ($1, $2, $3, $4, $5)', [reminderData.id_person, reminderData.reminder_text, reminderData.date_ref, creation_date, reminderData.flag_check], (err, reminders) => {
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
    return new Promise((resolve, reject) => this.connection.query('UPDATE REMINDER SET reminder_text = $1, date_ref = $2, flag_check = $3 WHERE id_reminder = $4', [reminderData.reminder_text, reminderData.date_ref, reminderData.flag_check, id],  (err, reminders) => {
    if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(reminders);
    }));
  }

  deleteReminder(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM REMINDER WHERE id_reminder = $1;', [id],  (err, reminders) => {
    if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(reminders);
    }));
  }

}
module.exports = ReminderDao;
