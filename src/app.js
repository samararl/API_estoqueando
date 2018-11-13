const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const path = require('path');
const pool = require('./config/database.js');
const logger = require('./config/logger.js');

const index = require('./routes/index');
const authenticateRoute = require('./routes/authenticateRoute');
const publicRoutes = require('./routes/publicRoute');
const personRoute = require('./routes/personRoute');
const userAdminRoute = require('./routes/userAdminRoute');
const catalogueRoute = require('./routes/catalogueRoute');
const productRoute = require('./routes/productRoute');
const reminderRoute = require('./routes/reminderRoute');
const evaluationRoute = require('./routes/evaluationRoute');
const purchaseOrderRoute = require('./routes/purchaseOrderRoute');
const brandRoute = require('./routes/brandRoute');
const extractRoute = require('./routes/extractRoute');
const messageRoute = require('./routes/messageRoute');


const connectionMiddleware = require('./middleware/connectionMiddleware');

const app = express();
const swaggerDefinition = {
  info: {
    title: 'Estoqueando API',
    version: '1.0.0',
    description: 'Documentação do projeto ESTOQUEANDO',
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [`${path.resolve(__dirname)}\\routes\\*.js`],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

logger.info('Aplicação iniciada');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(connectionMiddleware(pool));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', false);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, X-HTTP-Method-Override, Content-Type, Accept, Referrer-Policy,Feature-Policy,Strict-Transport-Security,X-Frame-Options,X-XSS-Protection,X-Content-Type-Options');
    res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With, Authorization, X-HTTP-Method-Override, Content-Type, Accept');
    res.setHeader('Access-Control-Max-Age', 86400); // 24 horas
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('Feature-Policy', 'self');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubdomains; preload');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    res.end();
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, X-HTTP-Method-Override, Content-Type, Accept, Referrer-Policy,Feature-Policy,Strict-Transport-Security,X-Frame-Options,X-XSS-Protection,X-Content-Type-Options');
    res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With, Authorization, X-HTTP-Method-Override, Content-Type, Accept');
    res.setHeader('Access-Control-Max-Age', 86400); // 24 horas
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Authorization', 'Bearer');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('Feature-Policy', 'self');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubdomains; preload');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // res.setHeader('Access-Control-Expose-Headers', 'X-Custom-header');

    next();
  }
});

/* Public routes */
app.use('/', index);
app.use('/authenticate', authenticateRoute);
app.use('/public', publicRoutes);
app.use('/extract', extractRoute);

/* Public routes */

app.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const bearer = token.split(' ');
    jwt.verify(bearer[1], process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).send({
          success: false,
          message: 'Falha ao tentar autenticar o token!',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'Não há token.',
    });
  }
  return false;
});

/* Protected routes */
app.use('/brand', brandRoute);
app.use('/person', personRoute);
app.use('/useradmin', userAdminRoute);
app.use('/catalogue', catalogueRoute);
app.use('/product', productRoute);
app.use('/reminder', reminderRoute);
app.use('/evaluation', evaluationRoute);
app.use('/purchaseorder', purchaseOrderRoute);
app.use('/message', messageRoute);

/* Protected routes */

module.exports = app;
