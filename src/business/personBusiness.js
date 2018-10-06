const Joi = require('Joi');
const logger = require('winston');
const PersonDao = require('../models/personDao');


const personSchema = {
  name: Joi.string().min(3).max(50).required(),
  cpf: Joi.string().min(11).required().regex(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

class personBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validatePersonData(personData) {
    try {
      Joi.validate(
        {
          cpf: personData.cpf,
          name: personData.name,
          email: personData.email,
          password: personData.password,
        }, personSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new PersonDao(this.connection)
              .insertPerson(personData)
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = personBusiness;

