const Joi = require('joi');
const logger = require('winston');
const Extension = require('joi-date-extensions');
const CatalogueDao = require('../models/catalogueDao');

const ExtendedJoi = Joi.extend(Extension);

const catalogueSchema = {
  idBrand: Joi.required(),
  idSegment: Joi.required(),
  image: Joi.string(),
  description: Joi.string().min(3).max(255).required(),
  date: ExtendedJoi.date().format('DD-MM-YYYY').raw(),
};

class catalogueBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateCatalogueData(catalogueData) {
    try {
      Joi.validate({
        idBrand: catalogueData.idBrand,
        idSegment: catalogueData.idSegment,
        image: catalogueData.image,
        description: catalogueData.description,
        date: catalogueData.date,
      }, catalogueSchema, (err) => {
        if (err) {
          logger.debug(err);
          throw err;
        } else {
          new CatalogueDao(this.connection)
            .insertCatalogue(catalogueData);
        }
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = catalogueBusiness;
