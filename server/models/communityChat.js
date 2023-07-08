// models/CommunityChat.js
const mongoose = require('mongoose');

const communityChatSchema = new mongoose.Schema({
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    contentType: String,
    data: Buffer,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const CommunityChat = mongoose.model('CommunityChat', communityChatSchema);

module.exports = CommunityChat;
