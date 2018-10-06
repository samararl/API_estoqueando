const express = require('express');
const purchaseorderController = require('../controllers/purchaseorderController');

const router = express.Router();


/**
  * @swagger
  * /purchaseorder/add:
  *   post:
  *     summary: Criação de Pedido
  *     description:
  *       "Cria um pedido com os dados principais"
  *     tags:
  *       - Pedido - Inserir
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - id_consultant
  *             - id_client
  *             - order_date
  *             - total_price
  *             - sales_date
  *             - status
  *             - authenticate
  *           properties:
  *             id_consultant:
  *               type: integer
  *             id_client:
  *               type: integer
  *             order_date:
  *               type: date
  *             total_price:
  *               type: decimal
  *             sales_date:
  *               type: date
  *             status:
  *               type: string
  *             authenticate:
  *               type: string            
  *
  *           example: {
  *             "purchaseorderData": {
  *               "id_consultant": "1",
  *               "id_client": "3",
  *               "order_date": "10/09/2018",
  *               "total_price": "40",
  *               "sales_date": "12/09/2018",
  *               "status": "Em separação",
  *               "authenticate": "$someToken01020304"
  *              }
  *           }
  *     responses:
  *       200:
  *         description: "Pedido criado com sucesso"
  *         schema:
  *           type: object
  *           properties:
  *             succes:
  *               type: boolean
  *             message:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *              "message": "Criado com sucesso"
  *           }
  *       500:
  *         description: Pedido não pôde ser criado
  */

router.post('/add', purchaseorderController.post);


/**
  * @swagger
  * /purchaseorder:
  *   get:
  *     tags:
  *       - Pedido - buscar
  *     description: Busca todos os pedidos cadastrados
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - authenticate
  *           properties:
  *             authenticate:
  *               type: string
  *     responses:
  *       200:
  *         description: Pedidos listados com sucesso
*/

router.get('/', purchaseorderController.get);

/**
  * @swagger
  * /purchaseorder/{id}:
  *   put:
  *     tags:
  *       - Pedido - atualizar
  *     description: Atualizar determinado pedido cadastrado por id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - id_consultant
  *             - id_client
  *             - order_date
  *             - total_price
  *             - sales_date
  *             - status
  *             - authenticate
  *           properties:
  *             id_consultant:
  *               type: integer
  *             id_client:
  *               type: integer
  *             order_date:
  *               type: date
  *             total_price:
  *               type: decimal
  *             sales_date:
  *               type: date
  *             status:
  *               type: string
  *             authenticate:
  *               type: string   
  *     responses:
  *       200:
  *         description: Pedido atualizado com sucesso
*/

router.put('/:id', purchaseorderController.put);

  /**
  * @swagger
  * /purchaseorder/{id}:
  *   put:
  *     tags:
  *       - Pedido - desativar
  *     description: Desativar determinado pedido cadastrado por id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - authenticate
  *           properties:
  *             authenticate:
  *               type: string
  *     responses:
  *       200:
  *         description: Pedido desativado com sucesso
*/

router.put('/disable/:id', purchaseorderController.disablePurchaseorder);



/**
  * @swagger
  * /purchaseorder/{id}:
  *   delete:
  *     tags:
  *       - Pedido - excluir
  *     description: Excluir determinado pedido cadastrado por id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: Id do pedido
  *         required: true
  *         type: integer
    *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - authenticate
  *           properties:
  *             authenticate:
  *               type: string
  *     responses:
  *       200:
  *         description: Pedido excluído com sucesso
  */
router.delete('/:id', purchaseorderController.delete);

module.exports = router;
