const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Auth route endpoints mapping to controller functions
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;