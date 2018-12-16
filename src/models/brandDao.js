const logger = require('winston');

class BrandDao {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Lista as marcas cadastradas
   */
  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT id_brand AS "id", name AS "nome" FROM BRAND', (err, brands) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(brands);
    }));
  }

  insertBrand(brandData) {
    logger.debug(brandData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO BRAND (name) VALUES ($1)', [brandData.name], (err, brands) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(brands);
      logger.error(err);
    }));
  }

  updateBrand(id, brandData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE BRAND SET name = $1 WHERE id_brand = $2', [brandData.name, id], (err, brands) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(brands);
    }));
  }
}
module.exports = BrandDao;
