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
 * /product/addStock:
 *   post:
 *     summary: Cadastro de produto no estoque da consultora
 *     description:
 *       "Cadastro de produto no estoque da consultora"
 *     tags:
 *       - Produto - Inserir estoque
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - person
 *             - cod
 *             - quantity
 *             - price
 *             - authenticate
 *           properties:
 *             person:
 *               type: integer
 *             cod:
 *               type: integer
 *             quantity:
 *               type: integer
 *             price:
 *               type: decimal
 *             authenticate:
 *               type: string
 *
 *           example: {
 *             "stockData": {
 *               "person": "idPerson",
 *               "items": [
 *                  {
 *                      "quantity": "someQuantity",
 *                      "price": "somePrice",
 *                      "cod": "someCodRef",
 *                  }
 *                ],
 *               "authenticate": "$someToken01020304"
 *              }
 *           }
 *     responses:
 *       200:
 *         description: "Estoque cadastrado com sucesso"
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

router.post('/addStock', productController.addStock);

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
 * /product/products:
 *   get:
 *     tags:
 *       - Produto - buscar
 *     description: Busca todos os produtos de catálogos
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

router.get('/products', productController.listProducts);

/**
 * @swagger
 * /product/user/:id:
 *   get:
 *     tags:
 *       - Produto por pessoa
 *     description: Busca todos os produtos cadastrados para uma pessoa
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: params
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
 *         description: Produtos  de uma pessoa listados com sucesso
 */

router.get('/user/:id', productController.listProductByIdPerson);

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
