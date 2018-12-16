const http = require('http');


const zlib = require('zlib');


const fs = require('fs');


const path = require('path');


const isURL = require('is-url');

const langdata = require('../common/langdata.json');

function getLanguageData(req, res, cb) {
  const lang = req.options.lang;


  const langfile = `${lang}.traineddata.gz`;

  // langPath defaults to a URL where languages can be downloaded. If a custom path is specified
  // and it is a local path, use that instead
  const localPath = isURL(req.workerOptions.langPath)
    ? `${lang}.traineddata`
    : path.join(req.workerOptions.langPath, `${lang}.traineddata`);

  fs.readFile(localPath, (err, data) => {
    if (!err) return cb(new Uint8Array(data));

    http.get(req.workerOptions.langPath + langfile, (stream) => {
      let received_bytes = 0;
      stream.on('data', (chunk) => {
        received_bytes += chunk.length;
        res.progress({
          status: `downloading ${langfile}`,
          loaded: received_bytes,
          progress: Math.min(1, received_bytes / langdata[lang]),
        });
      });

      const gunzip = zlib.createGunzip();
      stream.pipe(gunzip).pipe(fs.createWriteStream(`${lang}.traineddata`));
      gunzip.on('end', () => {
        getLanguageData(req, stream, cb);
      });
    });
  });
}


module.exports = getLanguageData;
