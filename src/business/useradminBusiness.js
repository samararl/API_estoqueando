const Joi = require('joi');
const logger = require('winston');
const UseradminDao = require('../models/userAdminDao');


const userAdminSchema = {
  name: Joi.string().min(3).max(50).required(),
  login: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(6).required(),
  permision: Joi.number().integer(),
};

class userAdminBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  validateUseradminData(userAdminData) {
    try {
      Joi.validate(
        {
          name: userAdminData.name,
          login: userAdminData.login,
          password: userAdminData.password,
          permision: userAdminData.permision,
        }, userAdminSchema, (err) => {
          if (err) {
            logger.debug(err);
            throw err;
          } else {
            new UseradminDao(this.connection)
              .insertUseradmin(userAdminData);
          }
        },
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
module.exports = userAdminBusiness;
