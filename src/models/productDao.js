const logger = require('winston');

class ProductDao {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Roolback de transações
   * @todo VALIDADO SAMARA
   * @param {*} err
   */
  shouldAbort(err) {
    if (err) {
      logger.error('Error in transaction', err.stack);
      this.connection.query('ROLLBACK', (err) => {
        logger.debug('entra rollback');
        if (err) {
          logger.error('Error rolling back', err.stack);
        }
        // release the client back to the pool
      });
      return true;
    }
    return false;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('select A.stock_product as "estoque", A.consultant_product_price as "preco_consultora", B.name as "consultora", C.id_product as "codigo", C.title as "produto", C.description "descricao", C.price as "preco_marca", C.photo as "imagem", C.cod_ref as "codigo_marca" from person_product A inner join person B on A.id_person = B.id_person inner join product C on A.id_product = C.id_product', (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }

  /**
   *
   */
  listProducts() {
    return new Promise((resolve, reject) => this.connection.query('select A.id_product as "codigo", A.title as "produto", A.description as "descricao", A.price as "preco", A.photo as "imagem", A.cod_ref as "ref" from product A', (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }

  /**
   * Retorna os produtos da vitrine de uma pessoa
   * @param {*} id
   */
  listProductByIdPerson(id) {
    return new Promise((resolve, reject) => this.connection.query('select A.stock_product as "estoque", A.consultant_product_price as "preco_consultora", B.name as "consultora", C.id_product as "codigo", C.title as "produto", C.description "descricao", C.price as "preco_marca", C.photo as "imagem", C.cod_ref as "codigo_marca" from person_product A inner join person B on A.id_person = B.id_person inner join product C on A.id_product = C.id_product where A.id_person = $1', id, (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }

  /**
   * Insere produtos no estoque de um cliente
   * @todo VALIDADO SAMARA
   * @param {*} stockData
   */
  insertStock(stockData) {
    const conexao = this.connection;
    logger.debug('Inserindo estoque');
    conexao.query('BEGIN', (errorBeginInsert) => {
      this.shouldAbort(errorBeginInsert);

      stockData.items.forEach((value) => {
        conexao.query('INSERT INTO PERSON_PRODUCT (ID_PERSON, ID_PRODUCT, STOCK_PRODUCT, CONSULTANT_PRODUCT_PRICE) VALUES ($1, $2, $3, $4)', [stockData.person, value.cod, value.quantity, value.price], (errorInsertProduct) => {
          this.shouldAbort(errorInsertProduct);
        });
      });

      conexao.query('COMMIT', (errorCommit) => {
        if (errorCommit) {
          logger.error('Error committing stock transaction', errorCommit.stack);
        }
      });
      return true;
    });
  }

  insertProduct(productData) {
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO PRODUCT (title, description, cod_ref) VALUES ($1, $2, $3)', [productData.title, productData.description, productData.cod_ref], (err, products) => {
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
