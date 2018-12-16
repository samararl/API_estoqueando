const Joi = require('joi');
const Extension = require('joi-date-extensions');

const ExtendedJoi = Joi.extend(Extension);
const logger = require('winston');
const ReminderDao = require('../models/reminderDao');


const reminderSchema = {
  idPurchaseOrder: Joi.number().integer(),
  reminderText: Joi.string().min(11).required(),
  dtRef: ExtendedJoi.date().format('DD-MM-YYYY').raw(),
};

class reminderBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateReminderData(reminderData) {
    try {
      Joi.validate({
        idPurchaseOrder: reminderData.idPurchaseOrder,
        reminderText: reminderData.reminderText,
        dtRef: reminderData.dtRef,
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
