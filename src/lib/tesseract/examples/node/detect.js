// replace this with require('tesseract.js')
const Tesseract = require('../../');


const image = require('path').resolve(__dirname, 'cosmic.png');

Tesseract.detect(image)
  .progress((info) => {
    console.log(info);
  })
  .then((data) => {
    console.log('done', data);
    process.exit();
  });
