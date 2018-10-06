const express = require('express');
const catalogueController = require('../controllers/catalogueController');
const router = express.Router();

/**
  * @swagger
  * /catalogue/add:
  *   post:
  *     summary: Cadastro de catálogo
  *     description:
  *       "Cadastra um novo catálogo à aplicação"
  *     tags:
  *       - Catálogo - Inserir
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - id_brand
  *             - period_ref
  *             - year_ref
  *             - description_ref
  *             - authenticate 
  *           properties:
  *             id_brand:
  *               type: int
  *             period_ref:
  *               type: int
  *             year_ref:
  *               type: int
  *             description_ref:
  *               type: string
  *             authenticate:
  *               type: string
  *
  *           example: {
  *             "catalogueData": {
  *               "id_brand": "someBrandId",
  *               "period_ref": "somePeriod",
  *               "year_ref": "someYear",
  *               "description_ref": "someDescription",
  *               "authenticate": "$someToken01020304"
  *              }
  *           }
  *     responses:
  *       200:
  *         description: "Catálogo cadastrado com sucesso"
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
  *              "message": "Cadastrado com sucesso"
  *           }
  *       500:
  *         description: Catálogo não pôde ser cadastrado
  */
router.post('/add', catalogueController.post);

/**
  * @swagger
  * /catalogue:
  *   get:
  *     tags:
  *       - Catálogo - buscar
  *     description: Busca todos os catálogos cadastrados
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
  *         description: Catálogos listados com sucesso
*/

router.get('/', catalogueController.get);

/**
  * @swagger
  * /catalogue/{id}:
  *   put:
  *     tags:
  *       - Catálogo - atualizar
  *     description: Atualizar determinado catálogo cadastrada por id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - id_brand
  *             - period_ref
  *             - year_ref
  *             - description_ref
  *             - authenticate
  *           properties:
  *             id_brand:
  *               type: int
  *             period_ref:
  *               type: int
  *             year_ref:
  *               type: int
  *             description_ref:
  *               type: string
  *             authenticate:
  *               type: string
  *     responses:
  *       200:
  *         description: Catálogo atualizado com sucesso
*/

router.put('/:id', catalogueController.put);

/**
  * @swagger
  * /catalogue/{id}:
  *   put:
  *     tags:
  *       - Catálogo - desativar
  *     description: Desativar determinado catálogo cadastrado por id
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
  *         description: Catálogo desativado com sucesso
*/

router.put('/disable/:id', catalogueController.disableCatalogue);

router.delete('/:id', catalogueController.delete);

module.exports = router;
