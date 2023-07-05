const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    receiver: {
      type: String, // Corrected type from 'Stri' to 'String'
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
