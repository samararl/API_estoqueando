const express = require('express');
const brandController = require('../controllers/brandController');

const router = express.Router();

/**
  * @swagger
  * /brand/add:
  *   post:
  *     summary: Cadastro de marca
  *     description:
  *       "Cadastra uma nova marca à aplicação"
  *     tags:
  *       - Marca - Inserir
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - segment
  *             - periodicity
  *             - description
  *             - authenticate
  *           properties:
  *             name:
  *               type: string
  *             segment:
  *               type: string
  *             periodicity:
  *               type: string
  *             description:
  *               type: string
  *             authenticate:
  *               type: string
  *
  *           example: {
  *             "brandData": {
  *               "name": "someName",
  *               "segment": "someSegment",
  *               "periodicity": "somPeriodicity",
  *               "description": "someDescription",
  *               "authenticate": "$someToken01020304"
  *              }
  *           }
  *     responses:
  *       200:
  *         description: "Marca cadastrada com sucesso"
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
  *         description: Marca não pôde ser cadastrada
  */

router.post('/add', brandController.post);

/**
  * @swagger
  * /brand:
  *   get:
  *     tags:
  *       - Marca - buscar
  *     description: Busca todas as marcas cadastradas
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
  *         description: Marcas listadas com sucesso
*/


router.get('/', brandController.get);

/**
  * @swagger
  * /brand/{id}:
  *   put:
  *     tags:
  *       - Marca - atualizar
  *     description: Atualizar determinada marca cadastrada por id
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
  *             - segment
  *             - periodicity
  *             - description
  *             - authenticate
  *           properties:
  *             name:
  *               type: string
  *             segment:
  *               type: string
  *             periodicity:
  *               type: string
  *             description:
  *               type: string
  *             authenticate:
  *               type: string
  *     responses:
  *       200:
  *         description: Marca atualizada com sucesso
*/
router.put('/:id', brandController.put);


/**
  * @swagger
  * /brand/{id}:
  *   put:
  *     tags:
  *       - Marca - desativar
  *     description: Desativar determinada marca cadastrada por id
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
  *         description: Marca desativada com sucesso
*/

module.exports = router;
