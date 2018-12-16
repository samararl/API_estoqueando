const BrandDao = require('../models/brandDao');
const BrandBusiness = require('../business/brandBusiness');

exports.get = (req, res) => {
  new BrandDao(req.connection)
    .list()
    .then(brands => res.status(200).json(brands.rows))
    .catch(brands => res.status(500).json(brands.rows));
};

exports.put = (req, res) => {
  new BrandDao(req.connection)
    .updateBrand(req.params.id, req.body.brandData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};


exports.post = (req, res) => {
  const response = {};
  try {
    new BrandBusiness(req.connection)
      .validateBrandData(req.body.brandData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }
};
