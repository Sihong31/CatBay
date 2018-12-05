const express = require('express');

const catController = require('../controllers/cat');

const router = express.Router();

// GET /cats
router.get('', catController.getCats);

// POST /cats
router.post('', catController.createCat);

// GET /cats/:catId
router.get('/:catId', catController.getCat);

// PUT /cats/:catId
router.put('/:catId', catController.updateCat);

// DELETE /cats/:catId
router.delete('/:catId', catController.deleteCat);

module.exports = router;
