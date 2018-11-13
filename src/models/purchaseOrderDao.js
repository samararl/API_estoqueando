const logger = require('winston');
const ReminderDao = require('../models/reminderDao');
const Reminder = require('../models/reminder');

class PurchaseOrderDao {
  constructor(connection) {
    this.connection = connection;
  }

  shouldAbort(err) {
    if (err) {
      logger.error('Error in transaction', err.stack);
      this.connection.query('ROLLBACK', (err) => {
        logger.debug('entra rollback');
        if (err) {
          logger.error('Error rolling back', err.stack);
        }
      });
      return true;
    }
    return false;
  }

  list() {
    return new Promise((resolve, reject) => this.connection.query('SELECT id_purchase_order AS id, id_consultant AS "id da consultora", order_date AS "data do pedido", total_price AS "valor total", sales_date AS "data da venda", status AS status, active AS ativo, obs AS observação FROM PURCHASE_ORDER', (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
    }));
  }

  insertPurchaseOrder(purchaseOrderData) {
    const conexao = this.connection;
    let returningIdPurchaseOrder = 0;
    const reminder = new Reminder(6, 'teste', '31/10/2018');

    conexao.query('BEGIN', (errorBeginInsert) => {
      this.shouldAbort(errorBeginInsert);

      conexao.query('INSERT INTO PURCHASE_ORDER (id_consultant, order_date, sales_date, obs, status) VALUES ($1, now(), $2, $3, $4)  RETURNING id_purchase_order', [purchaseOrderData.idConsultant, purchaseOrderData.salesDate, purchaseOrderData.obs, 'A'], (errorInsertPurchaseOrder, purchaseOrder) => {
        this.shouldAbort(errorInsertPurchaseOrder);
        returningIdPurchaseOrder = purchaseOrder.rows[0].id_purchase_order;
        let totalPrice = 0;
        purchaseOrderData.products.forEach((value) => {
          totalPrice += value.price_product;
          conexao.query('INSERT INTO PRODUCT_PURCHASE_ORDER (id_purchase_order, id_product, qtd_product) VALUES ($1, $2, $3)', [returningIdPurchaseOrder, value.idProduct, value.qtdProduct], (errorInsertProductPurchaseOrder) => {
            this.shouldAbort(errorInsertProductPurchaseOrder);
          });
        });

        conexao.query('UPDATE PURCHASE_ORDER SET total_price = $1 WHERE id_purchase_order = $2', [totalPrice, returningIdPurchaseOrder], (errorPutTotalPrice) => {
          this.shouldAbort(errorPutTotalPrice);
        });
        new ReminderDao(this.connection).insertReminder(reminder);
      });

      conexao.query('COMMIT', (errorCommit) => {
        if (errorCommit) {
          logger.error('Error committing stock transaction', errorCommit.stack);
        }
      });
      return true;
    });
  }

  updatePurchaseorder(id, purchaseOrderData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PURCHASE_ORDER SET id_consultant = $1, order_date = $2, total_price = $3, sales_date = $4, status = $5 WHERE id_purchase_order = $6', [purchaseOrderData.id_consultant, purchaseOrderData.order_date, purchaseOrderData.total_price, purchaseOrderData.sales_date, purchaseOrderData.status, id], (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
    }));
  }

  putTotalPrice(id, totalPrice) {
    const conexao = this.connection;

    connection.query('UPDATE PURCHASE_ORDER SET total_price = $1 WHERE id_purchase_order = $2', [totalPrice, id], (errorPutTotalPrice) => {
      this.shouldAbort(errorPutTotalPrice);
    });
  }


  disableProduct(id) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PURCHASE_ORDER SET active = 0 WHERE id_purchase_order = $1', [id], (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
    }));
  }


  deletePurchaseorder(id) {
    return new Promise((resolve, reject) => this.connection.query('DELETE FROM PURCHASE_ORDER WHERE id_purchase_order = $1;', [id], (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
    }));
  }
}
module.exports = PurchaseOrderDao;