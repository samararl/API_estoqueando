const logger = require('winston');

class ProductDao {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Roolback de transações
   * @param {*} err
   */
  shouldAbort(err) {
    if (err) {
      logger.error('Error in transaction', err.stack);
      this.connection.query('ROLLBACK', (error) => {
        logger.debug('entra rollback');
        if (error) {
          logger.error('Error rolling back', error.stack);
        }
      });
      return true;
    }
    return false;
  }

  /**
   *  Lista os produtos que não tenham sido removidos logicamente
   */
  listProducts() {
    return new Promise((resolve, reject) => this.connection.query('select A.cod, A.id_product as "id", A.description, A.title, A.image, A.cod, D.name as "brand", E.name as "segment" from product A inner join product_catalogue B on A.id_product = B.id_product inner join catalogue C on C.id_catalogue = B.id_catalogue inner join brand D on D.id_brand = C.id_brand inner join segment E on E.id_segment = C.id_segment where A.dt_removal is null group by (A.cod, A.id_product, A.description, A.title, A.image, A.cod, D.name, E.name) order by A.cod ', (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }


  /**
   * Lista os produtos disponíveis de um catálogo
   * @param {*} id
   */
  listProductByCatalogue(id) {
    return new Promise((resolve, reject) => this.connection.query('select A.catalogue_product_price as "cat_price", A.id_product_catalogue as "ref", B.title, B.description, B.image, B.cod, C.date, C.description, D.name as "brand", E.name as "segment" from product_catalogue A inner join product B on A.id_product = B.id_product inner join catalogue C on C.id_catalogue = A.id_catalogue inner join brand D on D.id_brand = C.id_brand inner join segment E on E.id_segment = C.id_segment where A.id_catalogue = $1 and B.dt_removal is null', [id], (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }


  /**
   * Insere produtos no estoque de um cliente
   * @param {*} stockData
   */
  insertStock(stockData) {
    const conexao = this.connection;
    logger.debug('Inserindo estoque');
    return new Promise((resolve, reject) => conexao.query('BEGIN', (errorBeginInsert) => {
      if (errorBeginInsert) {
        this.shouldAbort(errorBeginInsert);
        reject(errorBeginInsert);
      }
      stockData.items.forEach((value) => {
        logger.debug(value.cod);
        conexao.query('SELECT id_person_product, qtd_stock FROM PERSON_PRODUCT WHERE ID_PRODUCT = $1 and ID_PERSON = $2', [value.cod, stockData.person], (err, response) => {
          logger.debug(response);
          if (response.rows[0]) {
            const qtdStock = value.qtdStock + response.rows[0].qtd_stock;
            const idPersonProduct = response.rows[0].id_person_product;

            conexao.query('UPDATE PERSON_PRODUCT SET QTD_STOCK = $1 WHERE ID_PERSON_PRODUCT=$2 ', [qtdStock, idPersonProduct], (errorInsertProduct, stock) => {
              if (errorInsertProduct) {
                this.shouldAbort(errorInsertProduct);
                reject(errorInsertProduct);
              }
              logger.debug('Atualiza estoque');
              this.insertMoviment(conexao, reject, resolve, value, idPersonProduct, 'I');
            });
          } else {
            conexao.query('INSERT INTO PERSON_PRODUCT (ID_PERSON, ID_PRODUCT, QTD_STOCK) VALUES ($1, $2, $3)  RETURNING id_person_product', [stockData.person, value.cod, value.qtdStock], (errorInsertProduct, stock) => {
              if (errorInsertProduct) {
                this.shouldAbort(errorInsertProduct);
                reject(errorInsertProduct);
              }
              logger.debug('Insere estoque');
              const idPersonProduct = stock.rows[0].id_person_product;
              this.insertMoviment(conexao, reject, resolve, value, idPersonProduct, 'I');
            });
          }
        });
      });
    }));
  }

  /**
   * Insere movimentação no estoque e encadeia a chamada de inserção de preço
   * @param {*} conexao
   * @param {*} reject
   * @param {*} resolve
   * @param {*} value
   * @param {*} idPersonProduct
   */
  insertMoviment(conexao, reject, resolve, value, idPersonProduct, type) {
    conexao.query('INSERT INTO MOVIMENT (ID_PERSON_PRODUCT, TYPE, QTD) VALUES ($1,$2,$3) RETURNING ID_MOVIMENT', [idPersonProduct, type, value.qtdStock], (errorMoviment, moviment) => {
      if (errorMoviment) {
        this.shouldAbort(errorMoviment);
        reject(errorMoviment.stack);
      }
      logger.debug('Insere movimento');
      const movimentId = moviment.rows[0].id_moviment;
      this.insertPrice(conexao, reject, resolve, value, movimentId);
    });
  }

  /**
   * Insere a informação de preço ao adicionar o item no estoque
   * @param {*} conexao
   * @param {*} reject
   * @param {*} resolve
   * @param {*} value
   * @param {*} movimentId
   */
  insertPrice(conexao, reject, resolve, value, movimentId) {
    conexao.query('INSERT INTO PRICE (ID_MOVIMENT,PRICE) VALUES ($1, $2)', [movimentId, value.consultantPrice], (errorPrice) => {
      if (errorPrice) {
        this.shouldAbort(errorPrice);
        reject(errorPrice.stack);
      }

      logger.debug('Insere preço');
      conexao.query('COMMIT', (errorCommit) => {
        if (errorCommit) {
          logger.error('Error committing stock transaction', errorCommit.stack);
          reject(errorCommit.stack);
        }
        resolve(true);
      });
    });
  }

  /**
   * Baixa de produtos no estoque pessoal
   * @param {*} stockData
   */
  withdrawStock(stockData) {
    logger.debug('Retirando produtos do estoque');
    const conexao = this.connection;

    return new Promise((resolve, reject) => conexao.query('BEGIN', (errorBeginInsert) => {
      if (errorBeginInsert) {
        this.shouldAbort(errorBeginInsert);
        reject(errorBeginInsert);
      }

      conexao.query('SELECT  qtd_stock FROM PERSON_PRODUCT WHERE ID_PERSON_PRODUCT = $1', [stockData.stockCode], (err, response) => {
        logger.debug(response);
        const qtdStock = response.rows[0].qtd_stock - stockData.qtdStock;
        conexao.query('UPDATE PERSON_PRODUCT SET QTD_STOCK = $1 WHERE ID_PERSON_PRODUCT=$2 ', [qtdStock, stockData.stockCode], (errorInsertProduct, stock) => {
          if (errorInsertProduct) {
            this.shouldAbort(errorInsertProduct);
            reject(errorInsertProduct);
          }
          logger.debug('Atualiza estoque');
          this.insertMoviment(conexao, reject, resolve, stockData, stockData.stockCode, 'O');
        });
      });
    }));
  }

  /**
   * Retorna os produtos da vitrine de uma pessoa
   * @param {*} id
   */
  listProductByIdPerson(id) {
    logger.debug('Buscando estoque pessoal');
    return new Promise((resolve, reject) => this.connection.query('select A.id_person_product as "stockCode", A.qtd_stock as "qtdStock", B.title, B.description, B.cod, MAX(D.price) as "consultantPrice", F.id_brand as "brand", F.id_segment as "segment" from person_product A inner join product B on A.id_product = B.id_product inner join moviment C on C.id_person_product = A.id_person_product inner join price D on D.id_moviment = C.id_moviment inner join product_catalogue E on E.id_product = B.id_product inner join catalogue F on F.id_catalogue = E.id_catalogue where id_person = $1 group by(A.id_person_product,A.qtd_stock, B.title, B.description, B.cod, F.id_brand, F.id_segment)', [id], (err, products) => {
      if (err) {
        reject(err);
      }
      resolve(products.rows);
    }));
  }

  /**
   * Retorna os dados de um produto
   * @param {*} idProduct
   */
  getProductById(idProduct) {
    const conexao = this.connection;

    logger.debug('Buscando dados de um produto');
    return new Promise((resolve, reject) => conexao.query('select B.id_person_product as "idStock", B.id_person, B.qtd_stock as "qtdStock", C.name, C.city  from product A inner join person_product B on B.id_product = A.id_product inner join person C on B.id_person = C.id_person where A.id_product = $1', [idProduct], (err, products) => {
      if (err) {
        reject(err);
      }
      const product = {};
      product.person = [];
      product.person = products.rows;
      conexao.query('SELECT description, cod, image, title from product where id_product = $1', [idProduct], (errorProduct, response) => {
        if (errorProduct) {
          reject(errorProduct);
        }
        product.productData = response.rows[0];
        resolve(product);
      });
    }));
  }

  /**
   * Lista os produtos da vitrine geral
   */
  listStockProducts() {
    logger.debug('Listando produtos dos estoques');
    return new Promise((resolve, reject) => this.connection.query('select A.id_product as "id" , B.description, B.title, B.image, B.cod, MAX(D.id_price), MIN(D.id_price) from person_product A inner join product B on A.id_product = B.id_product inner join moviment C on C.id_person_product = A.id_person_product inner join price D on C.id_moviment = D.id_moviment where A.qtd_stock > 0 group by(A.id_product, B.description, B.title, B.image, B.cod) order by dt_creation', (err, products) => {
      if (err) {
        reject(err);
      }
      resolve(products.rows);
    }));
  }

  getProducts(id) {
    return new Promise((resolve, reject) => this.connection.query('select SUM(A.qtd_stock) as "entry", A.consultant_price, A.id_person as "codConsultant", B.name as "consultant"  , d.title , C.id_product_catalogue from person_product A INNER JOIN PERSON B on B.id_person = A.id_person inner join product_catalogue C on C.id_product_catalogue = A.id_product_catalogue inner join product D on C.id_product = D.id_product WHERE A.id_person = $1 AND status = $2 GROUP BY(C.id_product_catalogue, A.consultant_price, a.id_person, b.name, d.title)', [id, 'E'], (err, products) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(products);
    }));
  }


  /**
   * Insere produtos no catálogo
   * @param {*} productData
   */
  insertProduct(productData) {
    const conexao = this.connection;
    logger.debug('Inserindo produto');
    return new Promise((resolve, reject) => conexao.query('BEGIN', (errorBeginInsert) => {
      if (errorBeginInsert) {
        logger.debug('Erro begin insert');
        this.shouldAbort(errorBeginInsert);
        reject(errorBeginInsert);
      }
      conexao.query('SELECT TITLE, DESCRIPTION, IMAGE, COD FROM PRODUCT WHERE COD = $1', [productData.cod], (err, response) => {
        logger.debug(response);
        if (response.rows.length > 0) {
          logger.debug('Produto já cadastrado.');
          response.message = 'Produto já cadastrado.';
          response.success = true;
          resolve(response);
        } else {
          conexao.query('INSERT INTO PRODUCT (TITLE, DESCRIPTION, IMAGE, COD)VALUES ($1, $2, $3, $4) RETURNING id_product', [productData.title, productData.description, productData.image, productData.cod], (errorInsertProduct, product) => {
            if (errorInsertProduct) {
              this.shouldAbort(errorInsertProduct);
              reject(errorInsertProduct);
            }
            logger.debug('Insere produto');
            const idProduct = product.rows[0].id_product;
            this.insertProductCatalogue(conexao, reject, resolve, idProduct, productData.catalogueProductPrice, productData.idCatalogue);
          });
        }
      });
    }));
  }

  insertProductCatalogue(conexao, reject, resolve, idProduct, catalogueProductPrice, idCatalogue) {
    conexao.query('INSERT INTO PRODUCT_CATALOGUE ( ID_CATALOGUE, ID_PRODUCT, CATALOGUE_PRODUCT_PRICE) VALUES ($1, $2, $3)', [idCatalogue, idProduct, catalogueProductPrice], (errorProductCatalogue) => {
      if (errorProductCatalogue) {
        logger.debug('produto catálogo');
        this.shouldAbort(errorProductCatalogue);
        reject(errorProductCatalogue.stack);
      }

      logger.debug('Insere produto catálogo');
      conexao.query('COMMIT', (errorCommit) => {
        if (errorCommit) {
          logger.error('Error committing produto transaction', errorCommit.stack);
          reject(errorCommit.stack);
        }
        resolve(true);
      });
    });
  }
}

module.exports = ProductDao;