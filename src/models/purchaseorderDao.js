const logger = require('winston');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class PurchaseorderDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM PURCHASEORDER', (err, purchaseorders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseorders);
    }));

  }

  insertPurchaseorder(purchaseorderData) {
    logger.debug(purchaseorderData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO PURCHASEORDER (id_consultant, id_client, order_date, total_price, sales_date, status, active) VALUES ($1, $2, $3, $4, $5, $6, $7)', [purchaseorderData.id_consultant, purchaseorderData.id_client, purchaseorderData.order_date, purchaseorderData.total_price, purchaseorderData.sales_date, purchaseorderData.status, 1], (err, purchaseorders) => {
      if (err) {
      logger.error(err);
      reject(err);
        }
        resolve(purchaseorders);
        logger.error(err);
      }));
  }

  updatePurchaseorder(id, purchaseorderData) {
    logger.debug(purchaseorderData);
    return new Promise((resolve, reject) => this.connection.query('UPDATE PURCHASEORDER SET id_consultant = $1, id_client = $2, order_date = $3, total_price = $4, sales_date = $5, status = $6 WHERE id_purchaseorder = $7', [purchaseorderData.id_consultant, purchaseorderData.id_client, purchaseorderData.order_date, purchaseorderData.total_price, purchaseorderData.sales_date, purchaseorderData.status, id],  (err, purchaseorders) => {
    if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseorders);
    }));
  }

  disableProduct(id) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PURCHASEORDER SET active = 0 WHERE id_purchaseorder = $1', [id], (err, purchaseorders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseorders);
    }));
  }


  deletePurchaseorder(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM PURCHASEORDER WHERE id_purchaseorder = $1;', [id],  (err, purchaseorders) => {
    if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseorders);
    }));
  }
}
module.exports = PurchaseorderDao;
