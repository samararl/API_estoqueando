const express = require('express');
const personController = require('../controllers/personController');
const productController = require('../controllers/productController');

const router = express.Router();
/**
 * @swagger
 * /public/createPerson:
 *   post:
 *     summary: Criação de usuário para acesso a aplicação
 *     description:
 *       "Cria um usuário para acesso a aplicação com os dados principais para o cadastro"
 *     tags:
 *       - Usuário - cadastro
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - cpf
 *             - email
 *             - password
 *           properties:
 *             name:
 *               type: string
 *             cpf:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: password
 *
 *           example: {
 *             "personData": {
 *               "name": "someName",
 *               "cpf": "someCpf",
 *               "email": "someEmail",
 *               "password": "somePassword"
 *              }
 *           }
 *     responses:
 *       200:
 *         description: "Usuário criado com sucesso"
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
 *         description: Usuário não pôde ser criado
 */
router.post('/createPerson', personController.post);

/**
 * @swagger
 * /public/findEmail:
 *   get:
 *     tags:
 *       - Pública
 *     description: Retorna se o e-mail já existe
 *     produces:
 *       - application/json
 *     parameters:
 *       - email: query
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Se o e-mail já está no cadastro ou não
 */
router.get('/findEmail/:email', personController.findEmailController);
/**
 * @swagger
 * /public/findCpf:
 *   get:
 *     tags:
 *       - Pública
 *     description: Retorna se o cpf já existe
 *     produces:
 *       - application/json
 *     parameters:
 *       - cpf: query
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Se o cpf já está no cadastro ou não
 */
router.get('/findCPF/:cpf', personController.findCPFController);

router.get('/getProducts', productController.get);

module.exports = router;
