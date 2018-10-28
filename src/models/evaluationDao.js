const logger = require('winston');

class EvaluationDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM EVALUATION', (err, evaluations) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(evaluations);
    }));
  }

  insertEvaluation(evaluationData) {
    logger.debug(evaluationData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO EVALUATION (id_consultant, id_purchaseorder, evaluation, comments, date_ref) VALUES ($1, $2, $3, $4, $5)', [evaluationData.id_person, evaluationData.id_purchaseorder, evaluationData.evaluation, evaluationData.comments, evaluationData.date_ref], (err, evaluations) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(evaluations);
      logger.error(err);
    }));
  }

  updateEvaluation(id, evaluationData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE EVALUATION SET id_purchaseorder = $1, evaluation = $2, comments  = $3, date_ref = $4 WHERE id_evaluation = $5', [evaluationData.id_purchaseorder, evaluationData.evaluation, evaluationData.comments, evaluationData.date_ref, id], (err, evaluations) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(evaluations);
    }));
  }

  deleteEvaluation(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM EVALUATION WHERE id_evaluation = $1;', [id], (err, evaluations) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(evaluations);
    }));
  }
}
module.exports = EvaluationDao;
