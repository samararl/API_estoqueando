const PersonDao = require('../models/personDao');
const PersonBusiness = require('../business/personBusiness');

exports.get = (req, res) => {
  new PersonDao(req.connection)
    .list()
    .then(people => res.status(200).json(people.rows))
    .catch(people => res.status(500).json(people.rows));
};

exports.put = (req, res) => {
  const response = {};
  try {
    const resp = new PersonBusiness(req.connection)
      .validatePersonUpdateData(req.params.id, req.body.personData);
    resp.then(() => {
      response.success = true;
      response.message = 'Criado com sucesso';
      res.status(200).json(response);
    });
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }
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
    .catch(result => res.status(500).json(result));
};

exports.findCPFController = (req, res) => {
  new PersonDao(req.connection)
    .findCPF(req.params.cpf)
    .then(result => res.status(200).json(result))
    .catch(result => res.status(500).json(result));
};
