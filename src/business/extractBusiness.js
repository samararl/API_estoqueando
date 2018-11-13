const path = require('path');
const tesseract = require('../lib/tesseract/dist/tesseract');

class ExtractDao {
  /*
    const Tesseract = tesseract.create({
      workerPath: path.dirname('/API/src/lib/tesseract/src/node/worker.js'),
      langPath: path.dirname('/API/src/lib/tesseract/langs/'),
      corePath: path.dirname('/API/src/lib/tesseract/src/index.js'),
    });

    Tesseract.recognize('C:/Users/pa_se/Downloads/produtos/pro53.jpg', 'por')
      .progress((p) => {
        console.log('progress', p);
      })
      .catch(err => console.error(err))
      .then((result) => {
        extractData(result.text);
        console.log(result.text);
        process.exit(0);
      }); */
}
module.exports = ExtractDao;
