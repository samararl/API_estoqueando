const express = require('express');
const authenticateController = require('../controllers/authenticateController');

const router = express.Router();

/**
  * @swagger
  * /authenticate:
  *   post:
  *     summary: Autentica um usuário
  *     description:
  *       "Autenticação de usuário com email e senha para que ele possa utilizar a aplicação"
  *     tags:
  *       - Autenticação
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - email
  *             - password
  *           properties:
  *             email:
  *               type: string
  *             password:
  *               type: password
  *
  *           example: {
  *             "accessData": {
  *               "email": "someEmail",
  *               "password": "somePassword"
  *              }
  *           }
  *     responses:
  *       200:
  *         description: "Sucesso na autenticação"
  *         schema:
  *           type: object
  *           properties:
  *             succes:
  *               type: boolean
  *             message:
  *               type: string
  *             token:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": true,
  *              "message": "Token criado",
  *              "token": "1234"
  *           }
  *       401:
  *         description: Email e/ou senha inválidos - Acesso não autorizado
  */

router.post('/', authenticateController.post);
module.exports = router;
