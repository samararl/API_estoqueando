const { Pool } = require('pg');
const logger = require('winston');


const pool = new Pool({
 user: 'samara',
  host: 'estoqueando.cwldu7bor6j1.us-east-2.rds.amazonaws.com',
  database: 'estoqueando',
  password: 'estoqueando2018',
  port: 5432,
});
logger.info('Pool iniciado');


pool.on('release', () => console.log('pool => conexão retornada'));


process.on('SIGINT', () => pool.end((err) => {
  if (err) return console.log(err);
  logger.info('Pool fechado');
  process.exit(0);
}));

module.exports = pool;
