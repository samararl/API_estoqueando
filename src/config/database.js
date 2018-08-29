const { Pool } = require('pg');
const logger = require('winston');


const pool = new Pool({
  // user: 'samara',
  // host: 'estoqueando.cwldu7bor6j1.us-east-2.rds.amazonaws.com',
  // database: 'estoqueando',
  // password: 'estoqueando2018',
  url: 'postgres://daqscstutbfqso:859804edd0f85683982ab6833ad7665206522c8b9c247d09518c21f04ae3a8b5@ec2-50-17-194-129.compute-1.amazonaws.com:5432/dbjou3r9pqfb80',
  // port: 5432,
});
logger.info('Pool iniciado');


pool.on('release', () => console.log('pool => conexão retornada'));


process.on('SIGINT', () => pool.end((err) => {
  if (err) return console.log(err);
  logger.info('Pool fechado');
  process.exit(0);
}));

module.exports = pool;
