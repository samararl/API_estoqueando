const MessageDao = require('../models/messageDao');

exports.post = (req, res) => {
  new MessageDao(req.connection)
    .addMessage(req.body.messageData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

exports.listMessageByPerson = (req, res) => {
  new MessageDao(req.connection)
    .listMessageByPerson(req.params.id)
    .then(message => res.status(200).json(message))
    .catch(message => res.status(500).json(message));
};
exports.getChat = (req, res) => {
  new MessageDao(req.connection)
    .getChat(req.params.to, req.params.from)
    .then(message => res.status(200).json(message))
    .catch(message => res.status(500).json(message));
};
exports.get = (req, res) => {
  new MessageDao(req.connection)
    .list()
    .then(messages => res.status(200).json(messages.rows))
    .catch(messages => res.status(500).json(messages.rows));
};
