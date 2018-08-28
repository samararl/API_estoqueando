const { Pool } = require('pg');
const logger = require('winston');


const pool = new Pool({
   url: 'postgres://fexfwmiddikrel:3d753ae8cb5d2457007ab801c40419832f635b9f3e51f5dcdd024d5216ad0dea@ec2-54-235-160-57.compute-1.amazonaws.com:5432/d9tf0el90fe65i',
  extra: {
    ssl: true,
  },
});
logger.info('Pool iniciado');


pool.on('release', () => console.log('pool => conexão retornada'));


process.on('SIGINT', () => pool.end((err) => {
  if (err) return console.log(err);
  logger.info('Pool fechado');
  process.exit(0);
}));

module.exports = pool;
