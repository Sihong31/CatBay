const express = require('express');

const catController = require('../controllers/cat');

const router = express.Router();

// GET /cat/cats
router.get('/cats', catController.getCats);

module.exports = router;
