const CatalogueDao = require('../models/catalogueDao');
const CatalogueBusiness = require('../business/catalogueBusiness');
const logger = require('winston');

exports.get = (req, res, next) => {
  new CatalogueDao(req.connection)
    .list()
    .then(people => res.status(200).json(people.rows))
    .catch(people => res.status(500).json(people.rows));
};

exports.put = (req, res) => {
  new CatalogueDao(req.connection)
  .updateCatalogue(req.params.id, req.body.catalogueData)
  .then(response => res.status(200).json(response))
  .catch(response => res.status(500).json(response));
};

exports.post = (req, res) => {

  const response = {};
  try {
    new CatalogueBusiness(req.connection)
      .validateCatalogueData(req.body.catalogueData);
    response.success = true;
    response.message = 'Dados informados corretamente';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }

  /* certo
  new CatalogueDao(req.connection)
    .insertCatalogue(req.body.catalogueData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
    */
  
};

exports.delete = (req, res) => {
    new CatalogueDao(req.connection)
    .deleteCatalogue(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
  };

  exports.disableCatalogue = (req, res) => {
    new CatalogueDao(req.connection)
      .disableCatalogue(req.params.id)
      .then(response => res.status(200).json(response))
      .catch(response => res.status(500).json(response));
  };
  
