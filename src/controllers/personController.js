const PersonDao = require('../models/personDao');
const PersonBusiness = require('../business/personBusiness');
const logger = require('winston');

exports.get = (req, res) => {
  new PersonDao(req.connection)
    .list()
    .then(people => res.status(200).json(people.rows))
    .catch(people => res.status(500).json(people.rows));
};

exports.put = (req, res) => {
  new PersonDao(req.connection)
    .updatePerson(req.params.id, req.body.personData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
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


  /* tentativa de unir validação mas o .then .catch inicial que vai barrar quando e-mail já existir ou cpf
  const response = {};
  try{
    new PersonBusiness(req.connection)
      .validatePersonData(req.body.personData);
      response.sucess = true;
      response.message = 'Dados informados corretamente';
      new PersonDado.insertPerson(req.body.personData)
      .then(response => res.status(200).json(response))
      .catch(response => res.status(500).json(response.detail));
    }catch (error){
      response.sucess = false;
      response.message = error;
      res.status(500).json(response);
    }
  */
    /* CERTO
  new PersonDao(req.connection)
  .insertPerson(req.body.personData)
  .then(response => res.status(200).json(response))
  .catch(response => res.status(500).json(response.detail));
  */

};

exports.findEmailController = (req, res, next) => {
  new PersonDao(req.connection)
    .findEmail(req.params.email)
    .then(result => res.status(200).json(result))
    .catch(result => res.status(500).json('Falha no banco de dados.'));
};

exports.findCPFController = (req, res, next) => {
  new PersonDao(req.connection)
    .findCPF(req.params.cpf)
    .then(result => res.status(200).json(result))
    .catch(result => res.status(500).json('Falha no banco de dados.'));
};

exports.delete = (req, res) => {
  res.status(200).send(`Requisição recebida com sucesso! ${req.params.id}`);
};
