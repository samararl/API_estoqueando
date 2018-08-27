const BrandDao = require('../models/brandDao');

exports.get = (req, res, next) => {
  new BrandDao(req.connection)
    .list()
    .then(brands => res.status(200).json(brands.rows))
    .catch(brands => res.status(500).json(brands.rows));
};

exports.put = (req, res) => {
  res.status(201).send(`Requisição recebida com sucesso! ${req.params.id}`);
};
exports.delete = (req, res) => {
  res.status(200).send(`Requisição recebida com sucesso! ${req.params.id}`);
};

exports.post = (req, res) => {
  new BrandDao(req.connection)
  .insertBrand(req.body.brandData)
  .then(response => res.status(200).json(response))
  .catch(response => res.status(500).json(response));
}