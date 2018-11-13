const Joi = require('joi');
const Extension = require('joi-date-extensions');
const ExtendedJoi = Joi.extend(Extension);
const purchaseOrderDao = require('../models/purchaseOrderDao');


const purchaseOrderSchema = {
  id_consultant: Joi.number().integer().required(),
  sales_date: ExtendedJoi.date().format('DD-MM-YYYY').raw(),
  status: Joi.number().integer().required(),
};

class purchaseOrderBusiness {
  constructor(connection) {
    this.connection = connection;
  }  

  validatePurchaseOrderData(purchaseOrderData) { 
    /*
    try {
      Joi.validate(
        {
          id_consultant: purchaseOrderData.id_consultant,
          sales_date: purchaseOrderData.sales_date,
          status: purchaseOrderData.status,
        }, purchaseOrderSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new purchaseOrderDao(this.connection)
              .insertPurchaseorder(purchaseOrderData);
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    } */
    new purchaseOrderDao(this.connection)
              .insertPurchaseOrder(purchaseOrderData);        
} 

}
module.exports = purchaseOrderBusiness;
