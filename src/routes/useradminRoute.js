const express = require('express');
const userAdminController = require('../controllers/userAdminController');

const router = express.Router();


/**
  * @swagger
  * /useradmin/add:
  *   post:
  *     summary: Criação de usuário administrador
  *     description:
  *       "Cria um usuário administrador com os dados principais"
  *     tags:
  *       - Usuário administrador - Inserir
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - login
  *             - password
  *             - permision
  *             - authenticate
  *           properties:
  *             name:
  *               type: string
  *             login:
  *               type: string
  *             password:
  *               type: password
  *             permision:
  *               type: integer
  *             authenticate:
  *               type: integer
  *
  *           example: {
  *             "userAdminData": {
  *               "name": "someName",
  *               "login": "someLogin",
  *               "password": "somePassword",
  *               "permision": "1",
  *               "authenticate": "$someToken01020304"
  *              }
  *           }
  *     responses:
  *       200:
  *         description: "Usuário administrador criado com sucesso"
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
  *         description: Usuário administrador não pôde ser criada
  */

router.post('/add', userAdminController.post);


/**
  * @swagger
  * /useradmin:
  *   get:
  *     tags:
  *       - Usuário administrador - buscar
  *     description: Busca todos os usuários administradores cadastrados
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
  *         description: Usuários administradores listados com sucesso
*/

router.get('/', userAdminController.get);


/**
  * @swagger
  * /useradmin/{id}:
  *   put:
  *     tags:
  *       - Usuário administrador - atualizar
  *     description: Atualizar determinado usuário administrador cadastrado por id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *             - name
  *             - login
  *             - password
  *             - permision
  *             - authenticate
  *           properties:
  *             name:
  *               type: string
  *             login:
  *               type: string
  *             password:
  *               type: password
  *             permision:
  *               type: integer
  *             authenticate:
  *               type: integer
  *     responses:
  *       200:
  *         description: Usuário administrador atualizado com sucesso
*/
router.put('/:id', userAdminController.put);

/**
  * @swagger
  * /useradmin/{id}:
  *   put:
  *     tags:
  *       - Usuário administrador - desativar
  *     description: Desativar determinado usuário administrador cadastrado por id
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
  *         description: Usuário administrador desativado com sucesso
*/
router.put('/disable/:id', userAdminController.disableUseradmin);
router.delete('/:id', userAdminController.delete);


module.exports = router;
