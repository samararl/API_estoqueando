let latestJob;


let Module;


let base;


let adapter = {};


const dump = require('./dump.js');


const desaturate = require('./desaturate.js');

function dispatchHandlers(packet, send) {
  function respond(status, data) {
    send({
      jobId: packet.jobId,
      status,
      action: packet.action,
      data,
    });
  }
  respond.resolve = respond.bind(this, 'resolve');
  respond.reject = respond.bind(this, 'reject');
  respond.progress = respond.bind(this, 'progress');

  latestJob = respond;

  try {
    if (packet.action === 'recognize') {
      handleRecognize(packet.payload, respond);
    } else if (packet.action === 'detect') {
      handleDetect(packet.payload, respond);
    }
  } catch (err) {
    respond.reject(err);
  }
}
exports.dispatchHandlers = dispatchHandlers;

exports.setAdapter = function setAdapter(impl) {
  adapter = impl;
};


function handleInit(req, res) {
  let MIN_MEMORY = 100663296;

  if (['chi_sim', 'chi_tra', 'jpn'].includes(req.options.lang)) {
    MIN_MEMORY = 167772160;
  }

  if (!Module || Module.TOTAL_MEMORY < MIN_MEMORY) {
    const Core = adapter.getCore(req, res);

    res.progress({ status: 'initializing tesseract', progress: 0 });

    Module = Core({
      TOTAL_MEMORY: MIN_MEMORY,
      TesseractProgress(percent) {
        latestJob.progress({ status: 'recognizing text', progress: Math.max(0, (percent - 30) / 70) });
      },
      onRuntimeInitialized() {},
    });

    Module.FS_createPath('/', 'tessdata', true, true);
    base = new Module.TessBaseAPI();
    res.progress({ status: 'initializing tesseract', progress: 1 });
  }
}

function setImage(Module, base, image) {
  const imgbin = desaturate(image);


  const width = image.width;


  const height = image.height;

  const ptr = Module.allocate(imgbin, 'i8', Module.ALLOC_NORMAL);
  base.SetImage(Module.wrapPointer(ptr), width, height, 1, width);
  base.SetRectangle(0, 0, width, height);
  return ptr;
}

function loadLanguage(req, res, cb) {
  const lang = req.options.lang;


  const langFile = `${lang}.traineddata`;

  if (!Module._loadedLanguages) Module._loadedLanguages = {};
  if (lang in Module._loadedLanguages) return cb();

  adapter.getLanguageData(req, res, (data) => {
    res.progress({ status: `loading ${langFile}`, progress: 0 });
    Module.FS_createDataFile('tessdata', langFile, data, true, false);
    Module._loadedLanguages[lang] = true;
    res.progress({ status: `loading ${langFile}`, progress: 1 });
    cb();
  });
}


function handleRecognize(req, res) {
  handleInit(req, res);

  loadLanguage(req, res, () => {
    const options = req.options;

    function progressUpdate(progress) {
      res.progress({ status: 'initializing api', progress });
    }

    progressUpdate(0);
    base.Init(null, req.options.lang);
    progressUpdate(0.3);

    for (const option in options) {
      if (options.hasOwnProperty(option)) {
        base.SetVariable(option, options[option]);
      }
    }

    progressUpdate(0.6);
    const ptr = setImage(Module, base, req.image);
    progressUpdate(1);

    base.Recognize(null);

    const result = dump(Module, base);

    base.End();
    Module._free(ptr);

    res.resolve(result);
  });
}


function handleDetect(req, res) {
  handleInit(req, res);
  req.options.lang = 'osd';
  loadLanguage(req, res, () => {
    base.Init(null, 'osd');
    base.SetPageSegMode(Module.PSM_OSD_ONLY);

    const ptr = setImage(Module, base, req.image);


    const results = new Module.OSResults();

    if (!base.DetectOS(results)) {
      base.End();
      Module._free(ptr);
      res.reject('Failed to detect OS');
    } else {
      const best = results.get_best_result();


      const oid = best.get_orientation_id();


      const sid = best.get_script_id();

      base.End();
      Module._free(ptr);

      res.resolve({
        tesseract_script_id: sid,
        script: results.get_unicharset().get_script_from_script_id(sid),
        script_confidence: best.get_sconfidence(),
        orientation_degrees: [0, 270, 180, 90][oid],
        orientation_confidence: best.get_oconfidence(),
      });
    }
  });
}
