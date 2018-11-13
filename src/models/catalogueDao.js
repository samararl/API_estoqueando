const logger = require('winston');

class CatalogueDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT id_catalogue AS id, id_brand AS "id da marca", period_ref AS "periodo referência", year_ref AS "ano referência", description_ref AS "descrição referência", photo AS foto, active AS ativo FROM CATALOGUE', (err, catalogues) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(catalogues);
    }));
  }

  insertCatalogue(catalogueData) {
    logger.debug(catalogueData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO CATALOGUE (id_brand, period_ref, year_ref, description_ref, active) VALUES ($1, $2, $3, $4, $5)', [catalogueData.id_brand, catalogueData.period_ref, catalogueData.year_ref, catalogueData.description_ref, 1], (err, catalogues) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(catalogues);
    }));
  }

  updateCatalogue(id, catalogueData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE CATALOGUE SET id_brand = $1, period_ref = $2, year_ref = $3, description_ref = $4 WHERE id_catalogue = $5', [catalogueData.id_brand, catalogueData.period_ref, catalogueData.year_ref, catalogueData.description_ref, id], (err, catalogues) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(catalogues);
    }));
  }

  disableCatalogue(id) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE CATALOGUE SET active = 0 WHERE id_catalogue = $1', [id], (err, catalogues) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(catalogues);
    }));
  }


  deleteCatalogue(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM CATALOGUE WHERE id_catalogue = $1', [id], (err, catalogues) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(catalogues);
    }));
  }
}
module.exports = CatalogueDao;
