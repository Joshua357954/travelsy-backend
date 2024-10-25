const express = require('express');
const photoController = require('../controllers/photoController');

const router = express.Router();

// Route to get paginated and sorted photos
router.get('/', photoController.getPhotos);

module.exports = router;
