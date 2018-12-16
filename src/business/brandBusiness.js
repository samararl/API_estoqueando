const Joi = require('joi');
const logger = require('winston');
const BrandDao = require('../models/brandDao');


const brandSchema = {
  name: Joi.string().min(3).max(50).required(),
};

class brandBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateBrandData(brandData) {
    try {
      Joi.validate({
        name: brandData.name,
      }, brandSchema, (err) => {
        if (err) {
          logger.debug(err);
          throw err;
        } else {
          new BrandDao(this.connection)
            .insertBrand(brandData);
        }
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = brandBusiness;
