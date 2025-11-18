const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

// Places endpoints
router.get('/autocomplete', placesController.autocomplete);
router.get('/details', placesController.details);
router.get('/nearby', placesController.searchNearby);
router.get('/search', placesController.searchGeneral);

module.exports = router;