const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Message',
    },
  ],
});

chatSchema.pre('save', async function (next) {
  await this.populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'author',
      model: 'User',
      select: 'image username _id',
    },
  });
  next();
});

chatSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'author',
      model: 'User',
      select: 'image username _id',
    },
  });
  next();
});

module.exports = mongoose.model('Chat', chatSchema);
