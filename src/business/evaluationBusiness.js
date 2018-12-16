const Joi = require('joi');
const Extension = require('joi-date-extensions');

const ExtendedJoi = Joi.extend(Extension);
const logger = require('winston');
const EvaluationDao = require('../models/evaluationDao');


const evaluationSchema = {
  idConsultant: Joi.number().integer().required(),
  idClient: Joi.number().integer().required(),
  evaluation: Joi.number().required(),
  comment: Joi.string(),
  dtEvaluation: ExtendedJoi.date().format('DD-MM-YYYY').raw(),

};

class evaluationBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateEvaluationData(evaluationData) {
    try {
      Joi.validate({
        idConsultant: evaluationData.idConsultant,
        idClient: evaluationData.idClient,
        evaluation: evaluationData.evaluation,
        comment: evaluationData.comment,
        dtEvaluation: evaluationData.dtEvaluation,
      }, evaluationSchema, (err) => {
        if (err) {
          logger.debug(err);
          throw err;
        } else {
          new EvaluationDao(this.connection)
            .insertEvaluation(evaluationData);
        }
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = evaluationBusiness;
