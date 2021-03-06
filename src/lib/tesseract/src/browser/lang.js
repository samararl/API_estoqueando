const leveljs = require('level-js');

// something about trying to store these language files in indexedDB
// causes iOS Safari to crash

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const noIDB = typeof indexedDB === 'undefined' || iOS;

const db = noIDB ? { open: (_, cb) => cb(true) } : leveljs('./tessdata2');

const langdata = require('../common/langdata.json');

module.exports = function getLanguageData(req, res, cb) {
  const lang = req.options.lang;

  function saveDataFile(data) {
    try {
      db.put(lang, data, err => console.log('cached', lang, err));
    } finally {
      cb(data);
    }
  }

  db.open({ compression: false }, (err) => {
    if (err) return fetchLanguageData(req, res, cb);
    db.get(lang, (err, data) => {
      if (err) return fetchLanguageData(req, res, saveDataFile);
      res.progress({ status: `found in cache ${lang}.traineddata` });
      cb(data);
    });
  });
};


const ungzip = require('pako/lib/inflate.js').ungzip;

function fetchLanguageData(req, res, cb) {
  const lang = req.options.lang;
  const langfile = `${lang}.traineddata.gz`;
  const url = req.workerOptions.langPath + langfile;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onerror = (e) => {
    xhr.onprogress = xhr.onload = null;
    cb(xhr, null);
  };
  xhr.onprogress = e => res.progress({
    status: `downloading ${langfile}`,
    loaded: e.loaded,
    progress: Math.min(1, e.loaded / langdata[lang]),
  });

  xhr.onload = (e) => {
    if (!(xhr.status == 200 || (xhr.status == 0 && xhr.response))) return res.reject(`Error downloading language ${url}`);
    res.progress({ status: `unzipping ${langfile}`, progress: 0 });

    // in case the gzips are already ungzipped or extra gzipped
    let response = new Uint8Array(xhr.response);
    try {
      let n = 2;
      while (response[0] == 0x1f && response[1] == 0x8b) {
        response = ungzip(response);
        res.progress({ status: `unzipping ${langfile}`, progress: 1 - 1 / (n++) });
      }
    } catch (err) {
      return res.reject(`Error unzipping language file ${langfile}\n${err.message}`);
    }
    res.progress({ status: `unzipping ${langfile}`, progress: 1 });

    cb(response);
  };
  xhr.send();
}
