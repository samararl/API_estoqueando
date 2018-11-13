const ExtractBusiness = require('../business/extractBusiness');

exports.post = (req, res) => {
  const response = {};
  try {
    new ExtractBusiness(req.connection)
      .extractData(req.body.extractData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    logger.error(error);
    response.message = error;
    res.status(500).json(response);
  }
};
