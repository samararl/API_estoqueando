const express = require('express');
const movimentController = require('../controllers/movimentController');

const router = express.Router();

router.get('/:id', movimentController.listMovimentByPerson);
router.get('/group/:id', movimentController.listMovimentsGroup);


module.exports = router;
