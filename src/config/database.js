const { Pool } = require('pg');
const logger = require('winston');


const pool = new Pool({
  url:'postgres://samara:estoqueando2018@estoqueando.cwldu7bor6j1.us-east-2.rds.amazonaws.com/estoqueando?sslmode=verify-full&sslrootcert=config/rds-combined-ca-bundle.pem',
  port: 5432,
  ssl: true
});
logger.info('Pool iniciado');



pool.on('release', () => console.log('pool => conexão retornada'));


process.on('SIGINT', () => pool.end((err) => {
  if (err) return console.log(err);
  logger.info('Pool fechado');
  process.exit(0);
}));

module.exports = pool;
