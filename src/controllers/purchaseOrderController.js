const purchaseOrderDao = require('../models/purchaseOrderDao');
const purchaseOrderBusiness = require('../business/purchaseOrderBusiness');


exports.get = (req, res, next) => {
  new purchaseOrderDao(req.connection)
    .list()
    .then(purchaseorders => res.status(200).json(purchaseorders.rows))
    .catch(purchaseorders => res.status(500).json(purchaseorders.rows));
};

exports.put = (req, res) => {
  new purchaseOrderDao(req.connection)
    .updatePurchaseorder(req.params.id, req.body.purchaseOrderData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

exports.delete = (req, res) => {
  new purchaseOrderDao(req.connection)
    .deletePurchaseorder(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};

exports.post = (req, res) => {
  const response = {};
  try {
    new purchaseOrderBusiness(req.connection)
      .validatePurchaseOrderData(req.body.purchaseOrderData);
    response.success = true;
    response.message = 'Criado com sucesso';
    res.status(200).json(response);
  } catch (error) {
    response.success = false;
    response.message = error;
    res.status(500).json(response);
  }
};

exports.disablePurchaseorder = (req, res) => {
  new purchaseOrderDao(req.connection)
    .disablePurchaseorder(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};


exports.insertProductPurchaseOrder = (req, res) => {
  new purchaseOrderDao(req.connection)
    .insertProductPurchaseOrder(req.body.purchaseOrderData)
    .then(response => res.status(200).json(response))
    .catch(response => res.status(500).json(response));
};
