
const PersonDao = require('../models/personDao');

exports.post = (req, res) => {
  new PersonDao(req.connection)
    .authenticatePerson(req.body.accessData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(401).json(response));
};
