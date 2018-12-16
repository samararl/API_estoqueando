const MovimentDao = require('../models/movimentDao');

exports.listMovimentByPerson = (req, res) => {
  new MovimentDao(req.connection)
    .listMovimentByPerson(req.params.id)
    .then(moviments => res.status(200).json(moviments))
    .catch(moviments => res.status(500).json(moviments));
};
exports.listMovimentsGroup = (req, res) => {
  new MovimentDao(req.connection)
    .listMovimentsGroup(req.params.id)
    .then(moviments => res.status(200).json(moviments))
    .catch(moviments => res.status(500).json(moviments));
};
