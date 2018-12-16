const path = require('path');
const Tesseract = require('tesseract.js');

function extractData(text) {
  const extractCode = /(\d{6}|\d{5})/i;
  const extractTitle = /(\s(?!\d).*?\D*)/i;

  const removePipe = text.replace(/\|\s/g, '');
  const extratedCode = removePipe.match(extractCode);
  const removeCode = removePipe.replace(extractCode, '');
  const extratedTitle = removeCode.match(extractTitle);
  const extractdescription = removeCode.replace(extratedTitle[0], '');
  const productData = {
    title: extratedTitle[0],
    description: extractdescription,
    cod: extratedCode[0],
  };
  return productData;
}

class extractBusiness {
  constructor(imageData) {
    this.imageData = imageData;
  }

  extractText() {
    Tesseract.create({
      workerPath: path.join(__dirname, '../lib/tesseract/src/node/worker.js'),
      langPath: path.join(__dirname, '../lib/tesseract/langs/'),
      corePath: path.join(__dirname, '../lib/tesseract/src/index.js'),
    });
    Tesseract.recognize(this.imageData)
      .progress((p) => {
        console.log('progress', p);
      })
      .catch(err => console.error(err))
      .then((result) => {
        const datas = extractData(result.text);
        return console.log(datas);
      });
  }
}
module.exports = extractBusiness;
