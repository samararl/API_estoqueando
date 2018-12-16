const defaultOptions = {
  // workerPath: 'https://cdn.rawgit.com/naptha/tesseract.js/0.2.0/dist/worker.js',
  corePath: 'https://cdn.rawgit.com/naptha/tesseract.js-core/0.1.0/index.js',
  langPath: 'https://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/',
};

if (process.env.NODE_ENV === 'development') {
  console.debug('Using Development Configuration');
  defaultOptions.workerPath = `${location.protocol}//${location.host}/dist/worker.dev.js?nocache=${Math.random().toString(36).slice(3)}`;
} else {
  const version = require('../../package.json').version;
  defaultOptions.workerPath = `https://cdn.rawgit.com/naptha/tesseract.js/${version}/dist/worker.js`;
}

exports.defaultOptions = defaultOptions;


exports.spawnWorker = function spawnWorker(instance, workerOptions) {
  if (window.Blob && window.URL) {
    const blob = new Blob([`importScripts("${workerOptions.workerPath}");`]);
    var worker = new Worker(window.URL.createObjectURL(blob));
  } else {
    var worker = new Worker(workerOptions.workerPath);
  }

  worker.onmessage = function (e) {
    const packet = e.data;
    instance._recv(packet);
  };
  return worker;
};

exports.terminateWorker = function (instance) {
  instance.worker.terminate();
};

exports.sendPacket = function sendPacket(instance, packet) {
  loadImage(packet.payload.image, (img) => {
    packet.payload.image = img;
    instance.worker.postMessage(packet);
  });
};


function loadImage(image, cb) {
  if (typeof image === 'string') {
    if (/^\#/.test(image)) {
      // element css selector
      return loadImage(document.querySelector(image), cb);
    } if (/(blob|data)\:/.test(image)) {
      // data url
      let im = new Image();
      im.src = image;
      im.onload = e => loadImage(im, cb);
      return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('GET', image, true);
    xhr.responseType = 'blob';
    xhr.onload = e => loadImage(xhr.response, cb);
    xhr.onerror = function (e) {
      if (/^https?:\/\//.test(image) && !/^https:\/\/crossorigin.me/.test(image)) {
        console.debug('Attempting to load image with CORS proxy');
        loadImage(`https://crossorigin.me/${image}`, cb);
      }
    };
    xhr.send(null);
    return;
  } if (image instanceof File) {
    // files
    let fr = new FileReader();
    fr.onload = e => loadImage(fr.result, cb);
    fr.readAsDataURL(image);
    return;
  } if (image instanceof Blob) {
    return loadImage(URL.createObjectURL(image), cb);
  } if (image.getContext) {
    // canvas element
    return loadImage(image.getContext('2d'), cb);
  } if (image.tagName == 'IMG' || image.tagName == 'VIDEO') {
    // image element or video element
    let c = document.createElement('canvas');
    c.width = image.naturalWidth || image.videoWidth;
    c.height = image.naturalHeight || image.videoHeight;
    let ctx = c.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return loadImage(ctx, cb);
  } if (image.getImageData) {
    // canvas context
    let data = image.getImageData(0, 0, image.canvas.width, image.canvas.height);
    return loadImage(data, cb);
  }
  return cb(image);

  throw new Error('Missing return in loadImage cascade');
}
