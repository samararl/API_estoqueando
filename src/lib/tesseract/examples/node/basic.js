// replace this with require('tesseract.js')
const Tesseract = require('../../');


const image = require('path').resolve(__dirname, 'cosmic.png');

Tesseract.recognize(image)
  .then((data) => {
    console.log('then\n', data.text);
  })
  .catch((err) => {
    console.log('catch\n', err);
  })
  .finally((e) => {
    console.log('finally\n');
    process.exit();
  });
