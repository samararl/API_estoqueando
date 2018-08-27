const express = require('express');
const usesController = require('../controllers/usersController');

const router = express.Router();

router.post('/add', usesController.post);
router.get('/', usesController.get);
router.put('/:id', usesController.put);
router.delete('/:id', usesController.delete);
module.exports = router;
