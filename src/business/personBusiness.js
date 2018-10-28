const Joi = require('joi');
const logger = require('winston');
const PersonDao = require('../models/personDao');


const insertPersonSchema = {
  name: Joi.string().min(3).max(50).required(),
  cpf: Joi.string().min(11).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};
const updatePersonSchema = {
  name: Joi.string().min(3).max(50),
  flagConsultant: Joi.boolean(),
  flagPremium: Joi.boolean(),
  genre: Joi.string().min(1).max(1),
  cep: Joi.string().min(8).max(8),
  uf: Joi.string().min(2).max(2),
  phone: Joi.string().min(6).max(12),
  photo: Joi.string(),
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
        }, insertPersonSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new PersonDao(this.connection)
              .insertPerson(personData);
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  validatePersonUpdateData(idPerson, personData) {
    const result = Joi.validate(
      {
        name: personData.name,
        flagConsultant: personData.flagConsultant,
        flagPremium: personData.flagPremium,
        genre: personData.genre,
        cep: personData.cep,
        uf: personData.uf,
        phone: personData.phone,
        photo: personData.phone,
      }, updatePersonSchema,
    );

    if (result.error === null) {
      new PersonDao(this.connection)
        .updatePerson(idPerson, personData)
        .then(res => res)
        .catch(err => err);
    } else {
      throw result.error;
    }
  }
}
module.exports = personBusiness;
