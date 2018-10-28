const Joi = require('joi');
const logger = require('winston');
const EvaluationDao = require('../models/evaluationDao');


const evaluationSchema = {
  id_person: Joi.number().integer().required(),
  id_purchaseorder: Joi.number().integer().required(),
  evaluation: Joi.number().required(),
  comments: Joi.string(),
  date_ref: Joi.date().required(),
};

class evaluationBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateEvaluationData(evaluationData) {
    try {
      Joi.validate(
        {
          id_person: evaluationData.id_person,
          id_purchaseorder: evaluationData.id_purchaseorder,
          evaluation: evaluationData.evaluation,
          comments: evaluationData.comments,
          date_ref: evaluationData.date_ref,
        }, evaluationSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new EvaluationDao(this.connection)
              .insertEvaluation(evaluationData);
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = evaluationBusiness;
