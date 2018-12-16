const logger = require('winston');

class CatalogueDao {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Lista os catálogos disponíveis
   */
  list() {
    return new Promise((resolve, reject) => this.connection.query('select id_catalogue as "id", date, description, image, B.name as "brand", C.name as "segment" from catalogue A inner join brand B on B.id_brand = A.id_brand inner join segment C on C.id_segment = A.id_segment', (err, catalogues) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(catalogues);
    }));
  }

  /**
   * Lista catalago por id
   * @param {*} idBrand
   */
  listCatalogues(idBrand) {
    logger.debug('cheguei na dao');
    return new Promise((resolve, reject) => this.connection.query('SELECT id_catalogue as "id", id_brand, description as "nome" FROM catalogue where id_brand= $1 ', [idBrand], (err, listCatalogues) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(listCatalogues);
    }));
  }

  /**
   * Inserir catálogo
   */
  insertCatalogue(catalogueData) {
    logger.debug(catalogueData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO CATALOGUE (id_brand, id_segment, description, image, date) VALUES ($1, $2, $3, $4, $5)', [catalogueData.idBrand, catalogueData.idSegment, catalogueData.description, catalogueData.image, catalogueData.date], (err, catalogues) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(catalogues);
    }));
  }

  updateCatalogue(id, catalogueData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE CATALOGUE SET id_brand = $1, id_segment = $2, description = $3, image = $4 WHERE id_catalogue = $5', [catalogueData.idBrand, catalogueData.idSegment, catalogueData.description, catalogueData.image, id], (err, catalogues) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(catalogues);
    }));
  }
}
module.exports = CatalogueDao;
