const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// POST /auth/signup
router.post('/signup', authController.signup);

// POST /auth/login
router.post('/login', authController.login);

// GET /auth/user/:userId
router.get('/user/:userId', authController.fetchUser);

module.exports = router;
