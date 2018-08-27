const logger = require('winston');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class BrandDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM teste', (err, brands) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(brands);
    }));

  }
  insertBrand(brandData) {
    logger.debug(brandData);
    var description = brandData.description;

    let hash = bcrypt.hashSync(brandData.description, 10);
      logger.debug(hash);
      return new Promise((resolve, reject) => this.connection.query('INSERT INTO MARCA (nome_marca, segmento_marca, descricao_marca) VALUES ($1, $2, $3)', [brandData.name, brandData.segment, hash], (err, brands) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        resolve(brands);
      }));
  }

}
module.exports = BrandDao;
