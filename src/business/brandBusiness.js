const Joi = require('joi');
const logger = require('winston');
const BrandDao = require('../models/brandDao');


const brandSchema = {
  name: Joi.string().min(3).max(50).required(),
  segment: Joi.string().min(3).max(50).required(),
  periodicity: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(3).required(),
};

class brandBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateBrandData(brandData) {
    logger.debug('*** Dentro do validateBrandData');
    try {
      Joi.validate(
        {
          name: brandData.name,
          segment: brandData.segment,
          periodicity: brandData.periodicity,
          description: brandData.description,
        }, brandSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new BrandDao(this.connection)
              .insertBrand(brandData);
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = brandBusiness;
