const ReminderDao = require('../models/reminderDao');
const ReminderBusiness = require('../business/reminderBusiness');

exports.get = (req, res, next) => {
  new ReminderDao(req.connection)
    .list()
    .then(reminders => res.status(200).json(reminders.rows))
    .catch(reminders => res.status(500).json(reminders.rows));
};

exports.put = (req, res) => {
  new ReminderDao(req.connection)
  .updateReminder(req.params.id, req.body.reminderData)
  .then(response => res.status(200).json(response))
  .catch(response => res.status(500).json(response));
};

exports.delete = (req, res) => {
  new ReminderDao(req.connection)
  .deleteReminder(req.params.id)
  .then(response => res.status(200).json(response))
  .catch(response => res.status(500).json(response));
};

exports.post = (req, res) => {

  const response = {};
  try {
    new ReminderBusiness(req.connection)
      .validateReminderData(req.body.reminderData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }

  /*
  new ReminderDao(req.connection)
    .insertReminder(req.body.reminderData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
    */
};




