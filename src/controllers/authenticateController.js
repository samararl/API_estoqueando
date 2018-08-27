
const UserDao = require('../models/userDao');

exports.post = (req, res, next) => {
  new UserDao(req.connection)
    .authenticateUser(req.body.userData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(401).json(response));
};
