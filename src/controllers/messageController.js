const MessageDao = require('../models/messageDao');

exports.post = (req, res) => {
  new MessageDao(req.connection)
    .addMessage(req.body.messageData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

exports.get = (req, res) => {
  new MessageDao(req.connection)
    .list()
    .then(messages => res.status(200).json(messages.rows))
    .catch(messages => res.status(500).json(messages.rows));
};
