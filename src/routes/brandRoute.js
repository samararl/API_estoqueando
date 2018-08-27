const express = require('express');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.get('/', brandController.get);
router.put('/:id', brandController.put);
router.delete('/:id', brandController.delete);
router.post('/add', brandController.post);
module.exports = router;
