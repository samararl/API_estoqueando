const Joi = require('joi');
const logger = require('winston');
const ProductDao = require('../models/productDao');


const productSchema = {
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(50).required(),
  cod_ref: Joi.string().max(45).required(),
  catalogue_product_price: Joi.number().required(),
};

class productBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateProductData(productData) {
    try {
      Joi.validate({
        title: productData.title,
        description: productData.description,
        cod_ref: productData.cod_ref,
      }, productSchema, (validationError) => {
        if (validationError) {
          logger.debug(validationError);
          throw validationError;
        } else {
          new ProductDao(this.connection)
            .insertProduct(productData);
        }
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  validateStockData(stockData) {
    new ProductDao(this.connection)
      .insertStock(stockData);
  }
}
module.exports = productBusiness;
