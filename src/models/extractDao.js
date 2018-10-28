const logger = require('winston');
const tesseract = require('node-tesseract');
const fs = require('fs');

class ExtractDao {
  constructor(connection) {
    this.connection = connection;
  }

  extractData() {
    this.teste();
    logger.debug('init extract data');
  }

  /**
 * Following steps done under this functions.
 *
 * 1. Uploads image under '.tmp' folder.
 * 2. Grab text from image using 'tesseract-ocr'.
 * 3. Delete image from hardisk.
 * 4. Return text in json format.
 *
 * @param path
 */
  teste(path) {
    // Recognize text of any language in any format
    this.teste = 'teste';
    tesseract.process(path, (err, text) => {
      if (err) {
        console.error(err);
      } else {
        fs.unlink(path, (err) => {
          if (err) {
            return 'erro';
          }
          console.log('successfully deleted %s', path);
        });
        logger.debug(text);
        return 'Ok';
      }
    });
  }
}
module.exports = ExtractDao;
