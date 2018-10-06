const express = require('express');
const reminderController = require('../controllers/reminderController');

const router = express.Router();

/**
  * @swagger
  * /reminder/add:
  *   post:
  *     summary: Criação de lembrete
  *     description:
  *       "Cria um lembrete com os dados principais"
  *     tags:
  *       - Lembrete - Inserir
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - id_person
  *             - reminder_text
  *             - date_ref
  *             - flag_check
  *             - authenticate
  *           properties:
  *             id_person:
  *               type: integer
  *             reminder_text:
  *               type: string
  *             date_ref:
  *               type: date
  *             flag_check:
  *               type: integer
  *             authenticate:
  *               type: string
  *
  *           example: {
  *             "reminderData": {
  *               "id_person": "someId",
  *               "reminder_text": "someText",
  *               "date_ref": "someDate",
  *               "flag_check": "flagDone"
  *              }
  *           }
  *     responses:
  *       200:
  *         description: "Lembrete criado com sucesso"
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
  *         description: Lembrete não pôde ser criado
  */

router.post('/add', reminderController.post);


/**
  * @swagger
  * /reminder:
  *   get:
  *     tags:
  *       - Lembrete - buscar
  *     description: Busca todos os lembretes cadastrados
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: Lembretes listados com sucesso
*/

router.get('/', reminderController.get);

/**
  * @swagger
  * /reminder/{id}:
  *   put:
  *     tags:
  *       - Lembrete - atualizar
  *     description: Atualizar determinado lembrete cadastrado por id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - id_person
  *             - reminder_text
  *             - date_ref
  *             - flag_check
  *             - authenticate
  *           properties:
  *             id_person:
  *               type: integer
  *             reminder_text:
  *               type: string
  *             date_ref:
  *               type: date
  *             flag_check:
  *               type: integer
  *             authenticate:
  *               type: string
  *     responses:
  *       200:
  *         description: Lembrete atualizado com sucesso
*/

router.put('/:id', reminderController.put);


/**
  * @swagger
  * /reminder/{id}:
  *   delete:
  *     tags:
  *       - Lembrete - excluir
  *     description: Excluir determinado lembrete por id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: Id do lembrete
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
  *         description: Lembrete excluído com sucesso
  */

router.delete('/:id', reminderController.delete);

module.exports = router;
