const Joi = require('Joi');
const logger = require('winston');
const UseradminDao = require('../models/useradminDao');


const useradminSchema = {
  name: Joi.string().min(3).max(50).required(),
  login: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(6).required(),
  permision: Joi.number().integer(),
};

class useradminBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateUseradminData(useradminData) {
    try {
      Joi.validate(
        {
          name: useradminData.name,
          login: useradminData.login,
          password: useradminData.password,
          permision: useradminData.permision,
        }, useradminSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new UseradminDao(this.connection)
              .insertUseradmin(useradminData)
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = useradminBusiness;