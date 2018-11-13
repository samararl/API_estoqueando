const BrandBusiness = require('./brandBusiness');

jest.mock('axios');

test('should fetch users', () => BrandBusiness.validateBrandData().then(users => expect(users).toEqual(true)));
