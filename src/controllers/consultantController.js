const ConsultantDao = require('../models/consultantDao');

exports.get = (req, res, next) => {
  new ConsultantDao(req.connection)
    .list()
    .then(consultants => res.status(200).json(consultants.rows))
    .catch(consultants => res.status(500).json(consultants.rows));
};

exports.put = (req, res) => {
  res.status(201).send(`Requisição recebida com sucesso! ${req.params.id}`);
};
exports.delete = (req, res) => {
  res.status(200).send(`Requisição recebida com sucesso! ${req.params.id}`);
};

exports.post = (req, res) => {
  new ConsultantDao(req.connection)
    .insertConsultant(req.body.consultantData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

