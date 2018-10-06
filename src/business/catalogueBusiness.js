const Joi = require('Joi');
const logger = require('winston');
const CatalogueDao = require('../models/catalogueDao');


const catalogueSchema = {
  id_brand: Joi.number().integer().required(),
  period_ref: Joi.number().integer().required(),
  year_ref: Joi.number().integer().required(),
  description_ref: Joi.string().min(3).max(50).required(),
};

class catalogueBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateCatalogueData(catalogueData) {
    try {
      Joi.validate(
        {
          id_brand: catalogueData.id_brand,
          period_ref: catalogueData.period_ref,
          year_ref: catalogueData.year_ref,
          description_ref: catalogueData.description_ref,
        }, catalogueSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new CatalogueDao(this.connection)
              .insertCatalogue(catalogueData)
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = catalogueBusiness;
