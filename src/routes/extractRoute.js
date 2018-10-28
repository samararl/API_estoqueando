const express = require('express');
const extractController = require('../controllers/extractController');

const router = express.Router();

router.post('/', extractController.post);

module.exports = router;
