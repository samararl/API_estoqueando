const PersonDao = require('../models/personDao');
const PersonBusiness = require('../business/personBusiness');

exports.put = (req, res) => {
  new PersonDao(req.connection)
    .updatePerson(req.params.id, req.body.personData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(`Falha no banco de dados.${response}`));
};

exports.getPersonById = (req, res) => {
  new PersonDao(req.connection)
    .findPersonById(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(`Falha no banco de dados.${response}`));
};


exports.disablePerson = (req, res) => {
  new PersonDao(req.connection)
    .disablePerson(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

exports.post = (req, res) => {
  const response = {};
  try {
    new PersonBusiness(req.connection)
      .validatePersonData(req.body.personData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }
};

exports.findEmailController = (req, res) => {
  new PersonDao(req.connection)
    .findEmail(req.params.email)
    .then(result => res.status(200).json(result))
    .catch(response => res.status(500).json(`Falha no banco de dados.${response}`));
};

exports.passwordReminder = (req, res, next) => {
  new PersonDao(req.connection)
    .passwordReminder(req.params.email);
  res.status(200).send(`Requisição recebida com sucesso! ${req.params.email}`);
};

exports.findCPFController = (req, res, next) => {
  new PersonDao(req.connection)
    .findCPF(req.params.cpf)
    .then(result => res.status(200).json(result))
    .catch(response => res.status(500).json(`Falha no banco de dados.${response}`));
};
