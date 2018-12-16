const logger = require('winston');
const Joi = require('joi');
const Extension = require('joi-date-extensions');

const ExtendedJoi = Joi.extend(Extension);
const PurchaseOrderDao = require('../models/purchaseOrderDao');


const purchaseOrderSchema = {
  idConsultant: Joi.number().integer().required(),
  salesDate: ExtendedJoi.date().format('DD-MM-YYYY').raw(),
};

class purchaseOrderBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validatePurchaseOrderData(purchaseOrderData) {
    try {
      Joi.validate({
        idConsultant: purchaseOrderData.idConsultant,
        salesDate: purchaseOrderData.salesDate,
      }, purchaseOrderSchema, (err) => {
        if (err) {
          logger.debug(err);
          throw err;
        } else {
          new PurchaseOrderDao(this.connection)
            .insertPurchaseOrder(purchaseOrderData);
        }
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
    new PurchaseOrderDao(this.connection)
      .insertPurchaseOrder(purchaseOrderData);
  }
}
module.exports = purchaseOrderBusiness;
