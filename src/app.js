const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/database.js');
const logger = require('./config/logger.js');

const index = require('./routes/index');
const usersRoute = require('./routes/userRoute');
const authenticateRoute = require('./routes/authenticateRoute');
const brandRoute = require('./routes/brandRoute');
const consultantRoute = require('./routes/consultantRoute');

const connectionMiddleware = require('./middleware/connection-middleware');

const app = express();

logger.info('Aplicação iniciada');

const extendTimeoutMiddleware = (req, res, next) => {
  const space = ' ';
  let isFinished = false;
  let isDataSent = false;

  // Only extend the timeout for API requests
  if (!req.url.includes('/')) {
    next();
    return;
  }

  res.once('finish', () => {
    isFinished = true;
  });

  res.once('end', () => {
    isFinished = true;
  });

  res.once('close', () => {
    isFinished = true;
  });

  res.on('data', (data) => {
    // Look for something other than our blank space to indicate that real
    // data is now being sent back to the client.
    if (data !== space) {
      isDataSent = true;
    }
  });

  const waitAndSend = () => {
    logger.debug('entra timeout');
    setTimeout(() => {
      // If the response hasn't finished and hasn't sent any data back....
      if (!isFinished && !isDataSent) {
        // Need to write the status code/headers if they haven't been sent yet.
        if (!res.headersSent) {
          res.writeHead(202);
        }

        res.write(space);

        // Wait another 15 seconds
        waitAndSend();
      }
    }, 15000);
  };

  waitAndSend();
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(connectionMiddleware(pool));

app.use(extendTimeoutMiddleware);

app.use('/', index);
app.use('/users', usersRoute);
app.use('/authenticate', authenticateRoute);

app.use('/brand', brandRoute);

app.use('/consultant', consultantRoute);

module.exports = app;
