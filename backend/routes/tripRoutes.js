const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Get all trips
router.get('/', tripController.listTrips);

// Calculate fare for a trip
router.get('/calculate-fare', tripController.calculateFare);

// Create a new trip
router.post('/', tripController.createTrip);

module.exports = router;