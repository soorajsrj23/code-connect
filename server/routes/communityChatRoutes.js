// routes/communityChatRoutes.js
const express = require('express');
const router = express.Router();
const communityChatController = require('../controllers/communityChatController');

router.post('/:communityId', communityChatController.createCommunityChat);
router.get('/:communityId', communityChatController.getCommunityChatByCommunityId);

module.exports = router;
