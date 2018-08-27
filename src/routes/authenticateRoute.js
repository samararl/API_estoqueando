const express = require('express');
const authenticateController = require('../controllers/authenticateController');

const router = express.Router();

router.post('/', authenticateController.post);
module.exports = router;
