const ExtractDataBusiness = require('../business/extractDataBusiness');

/**
 * Trata dados do produto
 */
exports.extractData = (req) => {
  const extractCode = /(\d{6}|\d{5})/i;
  const extractTitle = /(\s(?!\d).*?\D*)/i;
  new ExtractDataBusiness(extractCode, extractTitle)
    .extractData(req.body.text);
};
