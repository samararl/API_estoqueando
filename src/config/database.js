const { Pool } = require('pg');
const logger = require('winston');


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'estoqueando',
  password: 'admin',
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
