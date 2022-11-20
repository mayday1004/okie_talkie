const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  content: { type: String },
  date: { type: Date, default: new Date() },
  type: { type: String, enum: ['PRIVATE', 'GROUP'] },
});

module.exports = mongoose.model('Message', messageSchema);
