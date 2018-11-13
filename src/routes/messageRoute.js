const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

/**
 * @swagger
 * /message/add:
 *   post:
 *     summary: Insere mensagem de chat
 *     description:
 *       "Histórico de mensagens no chat"
 *     tags:
 *       - Chat
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - personFrom
 *             - personTo
 *             - message
 *           properties:
 *             personFrom:
 *               type: int
 *             personTo:
 *               type: int
 *             message:
 *               type: string
 *           example: {
 *             "messageData": {
 *               "personTo": "somePerson",
 *               "personFrom": "somePerson",
 *               "message": "someMessage"
 *              }
 *           }
 *     responses:
 *       200:
 *         description: "Sucesso no armazenamento da mensagem"
 *         schema:
 *           type: object
 *           properties:
 *             succes:
 *               type: boolean
 *             message:
 *               type: string
 *         examples:
 *           application/json: {
 *             "success": true
 *           }
 *       500:
 *         description: Erro no armazenamento da mensagem
 */

router.post('/add', messageController.post);
module.exports = router;
