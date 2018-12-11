const express = require('express');

const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// GET /users/:userId
router.get('/:userId', checkAuth, userController.getUser);

// GET /users/:userId/cart
router.get('/:userId/cart', checkAuth, userController.getCart);

module.exports = router;
