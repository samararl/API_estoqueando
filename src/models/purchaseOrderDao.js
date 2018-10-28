const logger = require('winston');

class PurchaseOrderDao {
  constructor(connection) {
    this.connection = connection;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT * FROM PURCHASEORDER', (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
    }));
  }

  insertPurchaseorder(purchaseOrderData) {
    logger.debug(purchaseOrderData);
    return new Promise((resolve, reject) => this.connection.query('INSERT INTO PURCHASEORDER (id_consultant, id_client, order_date, total_price, sales_date, status, active) VALUES ($1, $2, $3, $4, $5, $6, $7)', [purchaseOrderData.id_consultant, purchaseOrderData.id_client, purchaseOrderData.order_date, purchaseOrderData.total_price, purchaseOrderData.sales_date, purchaseOrderData.status, 1], (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
      logger.error(err);
    }));
  }

  updatePurchaseorder(id, purchaseOrderData) {
    logger.debug(purchaseOrderData);
    return new Promise((resolve, reject) => this.connection.query('UPDATE PURCHASEORDER SET id_consultant = $1, id_client = $2, order_date = $3, total_price = $4, sales_date = $5, status = $6 WHERE id_purchaseorder = $7', [purchaseOrderData.id_consultant, purchaseOrderData.id_client, purchaseOrderData.order_date, purchaseOrderData.total_price, purchaseOrderData.sales_date, purchaseOrderData.status, id], (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
    }));
  }

  disableProduct(id) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PURCHASEORDER SET active = 0 WHERE id_purchaseorder = $1', [id], (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
    }));
  }


  deletePurchaseorder(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM PURCHASEORDER WHERE id_purchaseorder = $1;', [id], (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
    }));
  }
}
module.exports = PurchaseOrderDao;
