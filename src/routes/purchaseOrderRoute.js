const express = require('express');
const purchaseOrderController = require('../controllers/purchaseOrderController');

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
 *             - idConsultant
 *             - idClient
 *             - orderDate
 *             - totalPrice
 *             - salesDate
 *             - status
 *             - authenticate
 *           properties:
 *             idConsultant:
 *               type: integer
 *             id_client:
 *               type: integer
 *             orderDate:
 *               type: date
 *             totalPrice:
 *               type: decimal
 *             salesDate:
 *               type: date
 *             status:
 *               type: string
 *             authenticate:
 *               type: string
 *
 *           example: {
 *             "purchaseOrderData": {
 *               "idConsultant": "1",
 *               "idClient": "3",
 *               "orderDate": "10/09/2018",
 *               "totalPrice": "40",
 *               "salesDate": "12/09/2018",
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

router.post('/add', purchaseOrderController.post);


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

router.get('/', purchaseOrderController.insertProductPurchaseOrder);

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
 *             - idConsultant
 *             - orderDate
 *             - totalPrice
 *             - salesDate
 *             - status
 *             - authenticate
 *           properties:
 *             idConsultant:
 *               type: integer
 *             idClient:
 *               type: integer
 *             orderDate:
 *               type: date
 *             totalPrice:
 *               type: decimal
 *             salesDate:
 *               type: date
 *             status:
 *               type: string
 *             authenticate:
 *               type: string
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 */

router.put('/:id', purchaseOrderController.put);

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

router.put('/disable/:id', purchaseOrderController.disablePurchaseorder);


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
router.delete('/:id', purchaseOrderController.delete);
router.post('/addPO', purchaseOrderController.insertProductPurchaseOrder);


module.exports = router;
