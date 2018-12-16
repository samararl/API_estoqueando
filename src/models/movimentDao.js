const logger = require('winston');

class MovimentDao {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Retorna os movimentos de estoque
   * @param {*} id
   */
  listMovimentByPerson(id) {
    logger.debug('Buscando movimentos');
    return new Promise((resolve, reject) => this.connection.query('select B.dt_moviment as "movimentDate",B.type, B.qtd, B.id_moviment as "moviment",C.title, C.image, C.description, C.cod , E.id_brand as "brand" from person_product A inner join moviment B on A.id_person_product = B.id_person_product inner join product C on A.id_product = C.id_product inner join product_catalogue D on D.id_product = A.id_product inner join catalogue E on E.id_catalogue = D.id_catalogue where A.id_person = $1', [id], (err, moviments) => {
      if (err) {
        logger.error(err.stack);
        reject(err);
      }
      resolve(moviments.rows);
    }));
  }

  /**
   * Lista os movimentos agrupados por titulo e data
   * @param {*} id
   */
  listMovimentsGroup(id) {
    logger.debug('Buscando movimentos agrupados por data e tipo');
    return new Promise((resolve, reject) => this.connection.query('select sum(qtd) as "qtd", type,dt_moviment::DATE as "movimentDate" from person_product A inner join moviment B on A.id_person_product = B.id_person_product inner join product C on A.id_product = C.id_product where A.id_person = $1 group by(type, dt_moviment::DATE) order by dt_moviment::DATE', [id], (err, moviments) => {
      if (err) {
        logger.error(err.stack);
        reject(err);
      }
      resolve(moviments.rows);
    }));
  }
}
module.exports = MovimentDao;
