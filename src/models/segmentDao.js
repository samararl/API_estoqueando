const logger = require('winston');

class SegmentDao {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Lista os segmentos cadastrados
   */
  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT id_segment AS "id", name AS "nome" FROM SEGMENT', (err, segments) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(segments);
    }));
  }
}
module.exports = SegmentDao;
