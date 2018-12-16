const ProductDao = require('../models/productDao');
const ProductBusiness = require('../business/productBusiness');

exports.listProductByIdPerson = (req, res) => {
  new ProductDao(req.connection)
    .listProductByIdPerson(req.params.id)
    .then(products => res.status(200).json(products))
    .catch(products => res.status(500).json(products));
};

exports.listProductByCatalogue = (req, res) => {
  new ProductDao(req.connection)
    .listProductByCatalogue(req.params.id)
    .then(products => res.status(200).json(products.rows))
    .catch(products => res.status(500).json(products.rows));
};
exports.listStockProducts = (req, res) => {
  new ProductDao(req.connection)
    .listStockProducts(req.params.id)
    .then(products => res.status(200).json(products))
    .catch(products => res.status(500).json(products));
};
exports.getProductById = (req, res) => {
  new ProductDao(req.connection)
    .getProductById(req.params.id)
    .then(products => res.status(200).json(products))
    .catch(products => res.status(500).json(products));
};
exports.listProducts = (req, res) => {
  new ProductDao(req.connection)
    .listProducts()
    .then(products => res.status(200).json(products.rows))
    .catch(products => res.status(500).json(products.rows));
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
};

exports.addStock = (req, res) => {
  const response = {};
  try {
    new ProductBusiness(req.connection)
      .validateStockData(req.body.stockData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }
};

exports.withdrawStock = (req, res) => {
  const response = {};
  try {
    new ProductBusiness(req.connection)
      .validateWithdrawStockData(req.body.stockData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }
};
