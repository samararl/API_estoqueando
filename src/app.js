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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(connectionMiddleware(pool));

app.use('/', index);
app.use('/users', usersRoute);
app.use('/authenticate', authenticateRoute);

app.use('/brand', brandRoute);

app.use('/consultant', consultantRoute);

module.exports = app;
