const Joi = require('Joi');
const logger = require('winston');
const PurchaseorderDao = require('../models/purchaseorderDao');


const purchaseorderSchema = {
  id_consultant: Joi.number().integer().required(),
  id_client: Joi.number().integer(),
  order_date: Joi.date().required(),
  total_price: Joi.number().required(),
  sales_date: Joi.date().required(),
  status: Joi.string().min(6).required(),
};

class purchaseorderBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validatePurchaseorderData(purchaseorderData) {
    try {
      Joi.validate(
        {
          id_consultant: purchaseorderData.id_consultant,
          id_client: purchaseorderData.id_client,
          order_date: purchaseorderData.order_date,
          total_price: purchaseorderData.total_price,
          sales_date: purchaseorderData.sales_date,
          status: purchaseorderData.status,
        }, purchaseorderSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new PurchaseorderDao(this.connection)
              .insertPurchaseorder(purchaseorderData)
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = purchaseorderBusiness;

