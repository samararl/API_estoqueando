const Joi = require('joi');
const Extension = require('joi-date-extensions');

const ExtendedJoi = Joi.extend(Extension);
const logger = require('winston');
const ReminderDao = require('../models/reminderDao');


const reminderSchema = {
  id_person: Joi.number().integer(),
  reminder_text: Joi.string().min(11).required(),
  date_ref: ExtendedJoi.date().format('DD-MM-YYYY').raw(),
  flag_check: Joi.number().integer().required(),

};

class reminderBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateReminderData(reminderData) {
    try {
      Joi.validate({
        id_person: reminderData.id_person,
        reminder_text: reminderData.reminder_text,
        date_ref: reminderData.date_ref,
        flag_check: reminderData.flag_check,
      }, reminderSchema, (err) => {
        if (err) {
          logger.debug(err);
          throw err;
        } else {
          new ReminderDao(this.connection)
            .insertReminder(reminderData);
        }
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
    new ReminderDao(this.connection)
      .insertReminder(reminderData);
  }
}
module.exports = reminderBusiness;
