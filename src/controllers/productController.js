const ProductDao = require('../models/productDao');
const ProductBusiness = require('../business/productBusiness');

exports.get = (req, res, next) => {
  new ProductDao(req.connection)
    .list()
    .then(products => res.status(200).json(products.rows))
    .catch(products => res.status(500).json(products.rows));
};

exports.put = (req, res) => {
  new ProductDao(req.connection)
  .updateProduct(req.params.id, req.body.productData)
  .then(response => res.status(200).json(response))
  .catch(response => res.status(500).json(response));
};

exports.delete = (req, res) => {
  new ProductDao(req.connection)
  .deleteProduct(req.params.id)
  .then(response => res.status(200).json(response))
  .catch(response => res.status(500).json(response));
};

exports.post = (req, res) => {

  const response = {};
  try {
    new ProductBusiness(req.connection)
      .validateProductData(req.body.productData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }
  /*
  new ProductDao(req.connection)
    .insertProduct(req.body.productData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
    */
};

exports.disableProduct = (req, res) => {
  new ProductDao(req.connection)
    .disableProduct(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};


