const { Pool } = require('pg');
const logger = require('winston');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  // ssl: true,
});
logger.info('Pool iniciado');


pool.on('release', () => console.log('pool => conexão retornada'));


process.on('SIGINT', () => pool.end((err) => {
  if (err) return console.log(err);
  logger.info('Pool fechado');
  process.exit(0);
}));

module.exports = pool;
