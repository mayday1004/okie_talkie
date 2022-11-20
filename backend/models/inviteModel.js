const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide senderId'],
    },
    receiverId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide receiverId'],
    },
  },
  { timestamps: true }
);

inviteSchema.pre(/save|^find/i, function (next) {
  this.populate({
    path: 'senderId',
    select: '_id username email image',
  });
  this.populate({
    path: 'receiverId',
    select: '_id username email image',
  });

  next();
});

module.exports = mongoose.model('Invite', inviteSchema);
