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

// // POST /cats/favorite
router.post('/favorite', checkAuth, catController.createFavorite);

// // POST /cats/removeFavorite
router.post('/removeFavorite', checkAuth, catController.removeFavorite);

module.exports = router;
