const PurchaseOrderBusiness = require('./purchaseOrderBusiness');

jest.mock('axios');

test('should fetch users', () => PurchaseOrderBusiness.validatePurchaseOrderData().then(purchaseorders => expect(purchaseorders).toEqual(true)));
