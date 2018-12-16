class extractDataBusiness {
  constructor(extractCode, extractTitle) {
    this.extractCode = extractCode;
    this.extractTitle = extractTitle;
  }

  extractData(text) {
    const removePipe = text.replace(/\|\s/g, '');
    const extratedCode = removePipe.match(this.extractCode);
    const removeCode = removePipe.replace(this.extractCode, '');
    const extratedTitle = removeCode.match(this.extractTitle);
    const extractdescription = removeCode.replace(extratedTitle[0], '');
    const productData = {
      title: extratedTitle[0],
      description: extractdescription,
      cod: extratedCode[0],
    };
    return productData;
  }
}
module.exports = extractDataBusiness;
