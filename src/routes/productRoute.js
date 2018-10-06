const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
  * @swagger
  * /product/add:
  *   post:
  *     summary: Cadastro de produto
  *     description:
  *       "Cadastro de produto com os dados principais"
  *     tags:
  *       - Produto - Inserir
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - title
  *             - description
  *             - price
  *             - cod_ref
  *             - authenticate
  *           properties:
  *             title:
  *               type: string
  *             description:
  *               type: string
  *             price:
  *               type: decimal
  *             cod_ref:
  *               type: string
  *             authenticate:
  *               type: string
  *
  *           example: {
  *             "productData": {
  *               "title": "someTitle",
  *               "description": "someDescription",
  *               "price": "somePrice",
  *               "cod_ref": "someCodRef",
  *               "authenticate": "$someToken01020304"
  *              }
  *           }
  *     responses:
  *       200:
  *         description: "Produto cadastrado com sucesso"
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
  *         description: Produto não pôde ser cadastrado
  */

router.post('/add', productController.post);

/**
  * @swagger
  * /product:
  *   get:
  *     tags:
  *       - Produto - buscar
  *     description: Busca todos os produtos cadastradas
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
  *         description: Produtos listados com sucesso
*/

router.get('/', productController.get);

/**
  * @swagger
  * /product/{id}:
  *   put:
  *     tags:
  *       - Produto - atualizar
  *     description: Atualizar determinado produto cadastrado por id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - title
  *             - description
  *             - price
  *             - cod_ref
  *             - authenticate
  *           properties:
  *             title:
  *               type: string
  *             description:
  *               type: string
  *             price:
  *               type: decimal
  *             cod_ref:
  *               type: string
  *             authenticate:
  *               type: string
  *     responses:
  *       200:
  *         description: Produto atualizado com sucesso
*/
router.put('/:id', productController.put);

/**
  * @swagger
  * /product/{id}:
  *   put:
  *     tags:
  *       - Produto - desativar
  *     description: Desativar determinado produto cadastrado por id
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
  *         description: Produto desativado com sucesso
*/

router.put('/disable/:id', productController.disableProduct);

router.delete('/:id', productController.delete);

module.exports = router;
