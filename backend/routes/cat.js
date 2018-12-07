const express = require('express');

const catController = require('../controllers/cat');
const checkAuth = require('../middleware/check-auth.js');

const router = express.Router();

// GET /cats
router.get('', catController.getCats);

// POST /cats
router.post('', checkAuth, catController.createCat);

// GET /cats/:catId
router.get('/:catId', catController.getCat);

// PUT /cats/:catId
router.put('/:catId', checkAuth, catController.updateCat);

// DELETE /cats/:catId
router.delete('/:catId', checkAuth, catController.deleteCat);

module.exports = router;
