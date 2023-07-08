// controllers/communityChatController.js
const CommunityChat = require('../models/communityChat');

const createCommunityChat = async (req, res) => {
  try {
    const { communityId } = req.params;
    const {  message } = req.body;

    const newCommunityChat = new CommunityChat({
      community: communityId,
      user,
      message,
    });

    await newCommunityChat.save();

    res.status(201).json(newCommunityChat);
  } catch (error) {
    res.status(500).json({ 
        error: error.message,
      });
      
  }
};

const getCommunityChatByCommunityId = async (req, res) => {
  try {
    const { communityId } = req.params;

    const communityChat = await CommunityChat.find({ community: communityId });

    res.json(communityChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCommunityChat,
  getCommunityChatByCommunityId,
};
