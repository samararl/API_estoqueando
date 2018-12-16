const Joi = require('joi');

const logger = require('winston');
const ProductDao = require('../models/productDao');

const productSchema = {
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(255).required(),
  cod: Joi.string().max(45).required(),
  catalogueProductPrice: Joi.required(),
  idCatalogue: Joi.required(),
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
        cod: productData.cod,
        catalogueProductPrice: productData.catalogueProductPrice,
        idCatalogue: productData.idCatalogue,
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
      .insertStock(stockData)
      .then(response => response)
      .catch(response => response);
  }

  validateWithdrawStockData(stockData) {
    new ProductDao(this.connection)
      .withdrawStock(stockData);
  }
}
module.exports = productBusiness;
