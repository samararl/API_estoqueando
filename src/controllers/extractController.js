
const ExtractDao = require('../models/extractDao');

exports.post = (req, res) => {
  new ExtractDao(req.connection)
    .extractData(req.files.file.path);
};
