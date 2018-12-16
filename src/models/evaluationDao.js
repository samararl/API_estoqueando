const logger = require('winston');

class EvaluationDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT id_evaluation AS id, id_consultant AS "id da consultora", id_client AS "id do cliente", evaluation AS avaliação, comment AS comentários, dt_evaluation AS "data referência" FROM EVALUATION', (err, evaluations) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(evaluations);
    }));
  }

  insertEvaluation(evaluationData) {
    logger.debug(evaluationData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO EVALUATION (id_consultant, id_client,  evaluation, comment, dt_evaluation) VALUES ($1, $2, $3, $4, $5)', [evaluationData.idConsultant, evaluationData.idClient, evaluationData.evaluation, evaluationData.comment, evaluationData.dtEvaluation], (err, evaluations) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(evaluations);
      logger.error(err);
    }));
  }

  updateEvaluation(id, evaluationData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE EVALUATION SET id_consultant = $1, id_client = $2, evaluation = $3, comment = $4, dt_Evaluation = $5 WHERE id_evaluation = $6', [evaluationData.idConsultant, evaluationData.idClient, evaluationData.evaluation, evaluationData.comment, evaluationData.dt_Evaluation, id], (err, evaluations) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(evaluations);
    }));
  }

  /*
  deleteEvaluation(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM EVALUATION WHERE id_evaluation = $1;', [id], (err, evaluations) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(evaluations);
    }));
  } */
}
module.exports = EvaluationDao;
