const logger = require('winston');

class ReminderDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT id_reminder AS id, id_purchase_order AS "id do pedido", reminder_text AS texto, dt_ref AS "data referência", dt_creation AS "data de criação" FROM REMINDER', (err, reminders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(reminders);
    }));
  }

  insertReminder(reminderData) {
    logger.debug(reminderData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO REMINDER (id_purchase_order, reminder_text, dt_ref) VALUES ($1, $2, $3)', [reminderData.idPurchaseOrder, reminderData.reminderText, reminderData.dtRef], (err, reminders) => {
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
    return new Promise((resolve, reject) => this.connection.query('UPDATE REMINDER SET reminder_text = $1, dt_ref = $2 WHERE id_reminder = $3', [reminderData.reminderText, reminderData.dtRef, id], (err, reminders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(reminders);
    }));
  }
}
module.exports = ReminderDao;
