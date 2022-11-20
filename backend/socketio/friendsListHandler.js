const connectionHandler = require('./connectionHandler');
const trycatch = require('../utils/trycatch');
const Invite = require('../models/inviteModel');
const User = require('../models/userModel');

exports.updateFriendsList = trycatch(async currentUserId => {
  const currentUserList = connectionHandler.getActiveConnections(currentUserId);

  if (currentUserList.length > 0) {
    const user = await User.findById(currentUserId).populate('friends', '_id username email image');

    if (user) {
      const friendsList = user.friends.map(f => {
        return {
          id: f._id,
          email: f.email,
          username: f.username,
          image: f.image,
        };
      });

      const io = connectionHandler.getSocketServerInstance();
      currentUserList.forEach(currentUserSocketId => {
        io.to(currentUserSocketId).emit('friends-list', {
          friends: friendsList ? friendsList : [],
        });
      });
    }
  }
});

exports.updatePendingInvite = trycatch(async currentUserId => {
  const pendingInvitations = await Invite.find({ receiverId: currentUserId });

  // find all active connections of specific userId
  const currentUserList = connectionHandler.getActiveConnections(currentUserId);

  const io = connectionHandler.getSocketServerInstance();
  currentUserList.forEach(currentUserSocketId => {
    io.to(currentUserSocketId).emit('friends-invitations', {
      pendingInvitations: pendingInvitations ? pendingInvitations : [],
    });
  });
});

exports.checkOnlineUsers = () => {
  const onlineUsers = connectionHandler.getOnlineUsers();

  const io = connectionHandler.getSocketServerInstance();
  io.emit('online-users', { onlineUsers });
};
