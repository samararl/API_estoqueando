const logger = require('winston');

class ProductDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    //return new Promise((resolve, reject) => this.connection.query('select A.stock_product as "estoque", A.consultant_product_price as "preco_consultora", B.name as "consultora", C.id_product as "codigo", C.title as "produto", C.description "descricao", C.price as "preco_marca", C.photo as "imagem", C.cod_ref as "codigo_marca" from person_product A inner join person B on A.id_person = B.id_person inner join product C on A.id_product = C.id_product', (err, products) => {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM PRODUCT', (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }

  insertProduct(productData) {
    logger.debug(productData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO PRODUCT (title, description, cod_ref, active) VALUES ($1, $2, $3, $4)', [productData.title, productData.description, productData.cod_ref, 1], (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
      logger.error(err);
    }));
  }

  updateProduct(id, productData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PRODUCT SET title = $1, description = $2, cod_ref = $3, active = $4 WHERE id_product = $5', [productData.title, productData.description, productData.cod_ref, 1, id], (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }

  disableProduct(id) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PRODUCT SET active = 0 WHERE id_product = $1', [id], (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM Product WHERE id_product = $1;', [id], (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }
}
module.exports = ProductDao;
