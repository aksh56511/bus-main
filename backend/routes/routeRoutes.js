const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// @route   GET /api/routes/find
// @desc    Find routes between two stops
// @access  Public
router.get('/find', routeController.findRoutes);

module.exports = router;
