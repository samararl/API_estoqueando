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
  *             - cpf
  *             - email
  *             - password
  *             - active
  *             - flag_consultat
  *             - flag_premium
  *             - genre
  *             - cep
  *             - uf
  *             - phone
  *             - avarege_evaluation
  *             - photo
  *             - authenticate
  *           properties:
  *             name:
  *               type: string
  *             cpf:
  *               type: string
  *             email:
  *               type: string
  *             password:
  *               type: password
  *             active:
  *               type: int
  *             flag_consultant:
  *               type: int
  *             flag_premium:
  *               type: int
  *             genre:
  *               type: string
  *             cep:
  *               type: string
  *             uf:
  *               type: string  
  *             phone: 
  *               type: string
  *             avarege_evaluation:  
  *               type: decimal
  *             photo:    
  *               type: oid
  *             authenticate:
  *               type: string
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

router.delete('/:id', personController.delete);

// **** VER COMO TRATAR NA MESMA ROTA ******

router.get('/findEmail/:email', personController.findEmailController);
router.get('/findCPF/:cpf', personController.findCPFController);


module.exports = router;
