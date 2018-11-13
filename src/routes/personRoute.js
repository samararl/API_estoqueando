const express = require('express');
const personController = require('../controllers/personController');

const router = express.Router();

router.post('/add', personController.post);


/**
 * @swagger
 * /person:
 *   get:
 *     tags:
 *       - Usuário - buscar
 *     description: Busca todas os usuários cadastrados
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
 *         description: Usuários listados com sucesso
 */

router.get('/', personController.get);


/**
 * @swagger
 * /person/{id}:
 *   get:
 *     tags:
 *       - Usuário - buscar usuário por id
 *     description: Busca usuário por id
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: query
 *         in: query
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
 *         description: Dados do usuário
 */

router.get('/:id', personController.getPersonById);
/**
 * @swagger
 * /person/{id}:
 *   put:
 *     tags:
 *       - Usuário - atualizar
 *     description: Atualizar determinado usuário cadastrado por id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - flag_consultat
 *             - flag_premium
 *             - genre
 *             - cep
 *             - uf
 *             - phone
 *             - photo
 *             - authenticate
 *           properties:
 *             name:
 *               type: string
 *             flag_consultant:
 *               type: boolean
 *             flag_premium:
 *               type: boolean
 *             genre:
 *               type: string
 *             cep:
 *               type: string
 *             uf:
 *               type: string
 *             phone:
 *               type: string
 *             photo:
 *               type: oid
 *             authenticate:
 *               type: string
 *             example: {
 * "personData" : {
 *                 "name": "Samara Rocha Lipolis",
 *                 "flagPremium" : "false",
 *                 "genre": "F",
 *                 "cep":"02043061",
 *                 "uf": "SP",
 *                 "phone": "11983307692",
 *                 "photo":""
 *             }
 *           }
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */

router.put('/:id', personController.put);

/**
 * @swagger
 * /person/{id}:
 *   put:
 *     tags:
 *       - Usuário - desativar
 *     description: Desativar determinado usuário cadastrado por id
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
 *         description: Usuário desativado com sucesso
 */
router.put('/disable/:id', personController.disablePerson);

router.get('/findEmail/:email', personController.findEmailController);

router.get('/findCPF/:cpf', personController.findCPFController);


module.exports = router;
