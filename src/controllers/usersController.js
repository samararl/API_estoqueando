const UserDao = require('../models/userDao');

exports.get = (req, res, next) => {
  new UserDao(req.connection)
    .list()
    .then(users => res.status(200).json(users.rows))
    .catch(users => res.status(500).json(users.rows));
};

exports.post = (req, res, next) => {
  userData = {};
  userData.nome = 'testando';
  new UserDao(req.connection)
    .insertTeste(req.body.userData)
    .then(users => res.status(200).json(users.rows))
    .catch(users => res.status(500).json(users.rows));
}
exports.put = (req, res) => {
  res.status(201).send(`Requisição recebida com sucesso! ${req.params.id}`);
};
exports.delete = (req, res) => {
  res.status(200).send(`Requisição recebida com sucesso! ${req.params.id}`);
};
