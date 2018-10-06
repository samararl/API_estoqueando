const Joi = require('Joi');
const logger = require('winston');
const ProductDao = require('../models/productDao');


const productSchema = {
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(50).required(),
  cod_ref: Joi.string().max(45).required(),
};

class productBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateProductData(productData) {
    try {
      Joi.validate(
        {
          title: productData.title,
          description: productData.description,
          cod_ref: productData.cod_ref,
        }, productSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new ProductDao(this.connection)
              .insertProduct(productData)
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = productBusiness;

