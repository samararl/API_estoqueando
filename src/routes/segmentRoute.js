const express = require('express');
const segmentController = require('../controllers/segmentController');

const router = express.Router();

/**
 * @swagger
 * /segment:
 *   get:
 *     tags:
 *       - Segmento - buscar
 *     description: Busca todos os segmentos cadastrados
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
 *         description: Segmentos listados com sucesso
 */
router.get('/', segmentController.get);


module.exports = router;
