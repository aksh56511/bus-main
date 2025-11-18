const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

// Bus endpoints
router.get('/', busController.listBuses);
router.post('/', busController.createBus);

module.exports = router;