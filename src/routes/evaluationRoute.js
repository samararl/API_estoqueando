const express = require('express');
const evaluationController = require('../controllers/evaluationController');

const router = express.Router();


/**
  * @swagger
  * /evaluation/add:
  *   post:
  *     summary: Cadastro de avaliação
  *     description:
  *       "Cadastro de avaliação de uma consultora"
  *     tags:
  *       - Avaliação - Inserir
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - id_person
  *             - id_purchaseorder
  *             - evaluation
  *             - comments
  *             - date_ref
  *             - authenticate
  *           properties:
  *             id_person:
  *               type: integer
  *             id_purchaseorder:
  *               type: integer
  *             evaluation:
  *               type: integer
  *             comments:
  *               type: string
  *             date_ref:
  *               type: date
  *             authenticate:
  *               type: string  
  *           example: {
  *             "evaluationData": {
  *               "id_person": "someConsultant",
  *               "id_purchaseorder": "somePurchaseOrder",
  *               "evaluation": "someEvaluation",
  *               "comments": "someComments",
  *               "date_ref": "someDate",
  *               "authenticate": "$someToken01020304"
  *              }
  *           }
  *     responses:
  *       200:
  *         description: "Avaliação cadastrada com sucesso"
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
  *              "message": "Cadastrada com sucesso"
  *           }
  *       500:
  *         description: Avaliação não pôde ser cadastrada
*/

router.post('/add', evaluationController.post);

/**
  * @swagger
  * /evaluation:
  *   get:
  *     tags:
  *       - Avaliação - buscar
  *     description: Busca todas as avaliações cadastradas
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
  *         description: Avaliação listadas com sucesso
*/

router.get('/', evaluationController.get);

/**
  * @swagger
  * /evaluation/{id}:
  *   put:
  *     tags:
  *       - Avaliação - atualizar
  *     description: Atualizar determinada avaliação cadastrada por id
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
  *             - id_purchaseorder
  *             - evaluation
  *             - comments
  *             - date_ref
  *             - authenticate
  *           properties:
  *             id_person:
  *               type: integer
  *             id_purchaseorder:
  *               type: integer
  *             evaluation:
  *               type: integer
  *             comments:
  *               type: string
  *             date_ref:
  *               type: date
  *             authenticate:
  *               type: string  
  *     responses:
  *       200:
  *         description: Avaliação atualizada com sucesso
*/

router.put('/:id', evaluationController.put);

/**
  * @swagger
  * /evaluation/{id}:
  *   delete:
  *     tags:
  *       - Avaliação - excluir
  *     description: Excluir determinada marca avaliação por id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: Id da avaliação
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
  *         description: Avaliação excluída com sucesso
  */
router.delete('/:id', evaluationController.delete);

module.exports = router;
