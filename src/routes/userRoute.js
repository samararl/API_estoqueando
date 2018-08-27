const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.get);
router.put('/:id', userController.put);
router.delete('/:id', userController.delete);
module.exports = router;
