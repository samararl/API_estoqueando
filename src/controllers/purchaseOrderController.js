const PurchaseorderDao = require('../models/purchaseOrderDao');
const PurchaseorderBusiness = require('../business/purchaseOrderBusiness');

exports.get = (req, res) => {
  new PurchaseorderDao(req.connection)
    .list()
    .then(purchaseOrders => res.status(200).json(purchaseOrders.rows))
    .catch(purchaseOrders => res.status(500).json(purchaseOrders.rows));
};

exports.put = (req, res) => {
  new PurchaseorderDao(req.connection)
    .updatePurchaseorder(req.params.id, req.body.purchaseOrderData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

exports.delete = (req, res) => {
  new PurchaseorderDao(req.connection)
    .deletePurchaseorder(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

exports.post = (req, res) => {
  const response = {};
  try {
    new PurchaseorderBusiness(req.connection)
      .validatePurchaseorderData(req.body.purchaseOrderData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }

  /*
  new PurchaseorderDao(req.connection)
    .insertPurchaseorder(req.body.purchaseOrderData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
    */
};


exports.disablePurchaseorder = (req, res) => {
  new PurchaseorderDao(req.connection)
    .disablePurchaseorder(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};
