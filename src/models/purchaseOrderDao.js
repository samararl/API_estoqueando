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
    logger.debug(purchaseOrderData);
    let returnedIdPO = 0;

    conexao.query('INSERT INTO PURCHASE_ORDER (id_consultant, status, dt_sale, obs) VALUES ($1, $2, $3, $4)  RETURNING id_purchase_order', [purchaseOrderData.idConsultant, 'A', purchaseOrderData.salesDate, purchaseOrderData.obs], (errInsertPurchaseOrder, purchaseOrder) => {
      this.shouldAbort(errInsertPurchaseOrder);
      returnedIdPO = purchaseOrder.rows[0].id_purchase_order;


      let totalPrice = 0;
      purchaseOrderData.products.forEach((value) => {
        totalPrice += value.priceProduct;
        conexao.query('INSERT INTO PRODUCT_PURCHASE_ORDER (id_purchase_order, id_product, qtd_product) VALUES ($1, $2, $3)', [returnedIdPO, value.idProduct, value.qtdProduct], (errorInsertProductPurchaseOrder) => {
          this.shouldAbort(errorInsertProductPurchaseOrder);
        });
      });

      conexao.query('UPDATE PURCHASE_ORDER SET total_price = $1 WHERE id_purchase_order = $2', [totalPrice, returnedIdPO], (errorPutTotalPrice) => {
        this.shouldAbort(errorPutTotalPrice);
      });

      const wantReminder = true;

      const reminderData = new Reminder();
      reminderData.idPurchaseOrder = returnedIdPO;
      reminderData.reminderText = 'Não se esqueça de lançar o pedido junto à marca';
      reminderData.dtRef = '25-11-2018';


      new ReminderDao(this.connection).insertReminder(reminderData);
      if (wantReminder === true) {
        logger.debug(reminderData);
      } else {
        logger.debug('Não quer');
      }
    });
  }

  updatePurchaseorder(id, purchaseOrderData) {
    return new Promise((resolve, reject) => this.connection.query('UPDATE PURCHASE_ORDER SET id_consultant = $1, order_date = $2, total_price = $3, sales_date = $4, status = $5 WHERE id_purchase_order = $6', [purchaseOrderData.idConsultant, purchaseOrderData.orderDate, purchaseOrderData.totalPrice, purchaseOrderData.salesDate, purchaseOrderData.status, id], (err, purchaseOrders) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve(purchaseOrders);
    }));
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
