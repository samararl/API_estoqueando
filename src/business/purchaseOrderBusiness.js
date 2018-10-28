const Joi = require('joi');
const logger = require('winston');
const PurchaseorderDao = require('../models/purchaseOrderDao');


const purchaseOrderSchema = {
  id_consultant: Joi.number().integer().required(),
  id_client: Joi.number().integer(),
  order_date: Joi.date().required(),
  total_price: Joi.number().required(),
  sales_date: Joi.date().required(),
  status: Joi.string().min(6).required(),
};

class purchaseOrderBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validatePurchaseorderData(purchaseOrderData) {
    try {
      Joi.validate(
        {
          id_consultant: purchaseOrderData.id_consultant,
          id_client: purchaseOrderData.id_client,
          order_date: purchaseOrderData.order_date,
          total_price: purchaseOrderData.total_price,
          sales_date: purchaseOrderData.sales_date,
          status: purchaseOrderData.status,
        }, purchaseOrderSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new PurchaseorderDao(this.connection)
              .insertPurchaseorder(purchaseOrderData);
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = purchaseOrderBusiness;
