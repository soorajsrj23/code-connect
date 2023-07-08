// routes/communityRoutes.js
const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.get('/', communityController.getAllCommunities);

module.exports = router;
