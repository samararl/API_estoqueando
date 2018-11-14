const UseradminDao = require('../models/userAdminDao');
const UseradminBusiness = require('../business/userAdminBusiness');


exports.get = (req, res) => {
  new UseradminDao(req.connection)
    .list()
    .then(usersadmin => res.status(200).json(usersadmin.rows))
    .catch(usersadmin => res.status(500).json(usersadmin.rows));
};

exports.put = (req, res) => {
  new UseradminDao(req.connection)
    .updateUseradmin(req.params.id, req.body.useradminData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

exports.disableUseradmin = (req, res) => {
  new UseradminDao(req.connection)
    .disableUseradmin(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

exports.delete = (req, res) => {
  res.status(200).send(`Requisição recebida com sucesso! ${req.params.id}`);
};

exports.post = (req, res) => {
  const response = {};
  try {
    new UseradminBusiness(req.connection)
      .validateUseradminData(req.body.useradminData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }
};
