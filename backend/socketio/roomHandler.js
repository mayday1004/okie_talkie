const connectionHandler = require('./connectionHandler');

const updateRooms = (toSpecifiedSocketId = null) => {
  const io = connectionHandler.getSocketServerInstance();
  const activeRooms = connectionHandler.getActiveRooms();
  if (toSpecifiedSocketId) {
    io.to(toSpecifiedSocketId).emit('active-rooms', {
      activeRooms,
    });
  } else {
    io.emit('active-rooms', {
      activeRooms,
    });
  }
};

exports.getActiveRoomWhenConnect = socketId => {
  updateRooms(socketId);
};

exports.roomCreateHandler = socket => {
  const socketId = socket.id;
  const userId = socket.user.id;

  const roomDetails = connectionHandler.addNewActiveRoom(userId, socketId);

  socket.emit('room-create', {
    roomDetails,
  });

  updateRooms();
};

exports.roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.user.id,
    socketId: socket.id,
  };

  const roomDetails = connectionHandler.getActiveRoom(roomId);
  connectionHandler.joinActiveRoom(roomId, participantDetails);

  // send information to users in room that they should prepare for incoming connection
  roomDetails.participants.forEach(participant => {
    if (participant.socketId !== participantDetails.socketId) {
      //房主會收到加入房間的人的socketId
      socket.to(participant.socketId).emit('conn-prepare', {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  updateRooms();
};

exports.roomInitializeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;
  const initData = { connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit('conn-init', initData);
};

exports.roomSignalingDataHandler = (socket, data) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { signal, connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit('conn-signal', signalingData);
};

exports.roomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  const activeRoom = connectionHandler.getActiveRoom(roomId);

  if (activeRoom) {
    connectionHandler.leaveActiveRoom(roomId, socket.id);

    const updatedActiveRoom = connectionHandler.getActiveRoom(roomId);

    if (updatedActiveRoom) {
      updatedActiveRoom.participants.forEach(participant => {
        socket.to(participant.socketId).emit('room-participant-left', {
          connUserSocketId: socket.id,
        });
      });
    }

    updateRooms();
  }
};
