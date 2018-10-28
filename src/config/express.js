const express = require('express');
const logger = require('winston');

const app = express();

// middleware de tratamento de erro
app.use((err, req, res) => {
  logger.error(err.stack);
  res.status(500).json({ error: err.toString() });
});

module.exports = app;
