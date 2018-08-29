const express = require('express');
const consultantController = require('../controllers/consultantController');

const router = express.Router();

router.get('/', consultantController.get);
router.put('/:id', consultantController.put);
router.delete('/:id', consultantController.delete);
router.post('/add', consultantController.post);

module.exports = router;
