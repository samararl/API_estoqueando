const EvaluationDao = require('../models/evaluationDao');
const EvaluationBusiness = require('../business/evaluationBusiness');

exports.get = (req, res) => {
  new EvaluationDao(req.connection)
    .list()
    .then(evaluations => res.status(200).json(evaluations.rows))
    .catch(evaluations => res.status(500).json(evaluations.rows));
};

exports.put = (req, res) => {
  new EvaluationDao(req.connection)
    .updateEvaluation(req.params.id, req.body.evaluationData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

/*
exports.delete = (req, res) => {
  new EvaluationDao(req.connection)
    .deleteEvaluation(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
}; */

exports.post = (req, res) => {
  const response = {};
  try {
    new EvaluationBusiness(req.connection)
      .validateEvaluationData(req.body.evaluationData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }
};
