const logger = require('winston');
const bcrypt = require('bcrypt');

const saltRounds = 10;

class BrandDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM BRAND', (err, brands) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(brands);
    }));
  }

  insertBrand(brandData) {
    logger.debug(brandData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO BRAND (name, segment, periodicity, description, active) VALUES ($1, $2, $3, $4, $5)', [brandData.name, brandData.segment, brandData.periodicity, brandData.description, 1], (err, brands) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(brands);
      logger.error(err);
    }));
  }

  updateBrand(id, brandData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE BRAND SET name = $1, segment = $2, periodicity = $3, description = $4 WHERE id_brand = $5', [brandData.name, brandData.segment, brandData.periodicity, brandData.description, id], (err, brands) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(brands);
    }));
  }

  deleteBrand(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM BRAND WHERE id_brand = $1;', [id], (err, brands) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(brands);
    }));
  }

}
module.exports = BrandDao;
