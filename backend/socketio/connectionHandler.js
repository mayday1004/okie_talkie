const { v4: uuidv4 } = require('uuid');
const roomHandler = require('./roomHandler');

const connectedUsers = new Map();
let activeRooms = [];
let io = null;

exports.setSocketServerInstance = ioInstance => {
  io = ioInstance;
};

exports.getSocketServerInstance = () => {
  return io;
};

exports.addNewConnectorToList = socket => {
  connectedUsers.set(socket.id, { userId: socket.user.id });
};

exports.removeConnectorFromList = socket => {
  activeRooms.forEach(activeRoom => {
    const userInRoom = activeRoom.participants.some(participant => participant.socketId === socket.id);

    if (userInRoom) {
      roomHandler.roomLeaveHandler(socket, { roomId: activeRoom.roomId });
    }
  });

  if (connectedUsers.has(socket.id)) {
    connectedUsers.delete(socket.id);
  }
};

//取得當前操作用戶的socket.id =>azS1sAWOOo9n2VmnAAAC
exports.getActiveConnections = userId => {
  const activeConnections = [];
  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

//當前在線用戶對應的socket.id
exports.getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

// rooms
exports.addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
  };

  activeRooms = [...activeRooms, newActiveRoom];

  return newActiveRoom;
};

exports.getActiveRooms = () => {
  return [...activeRooms];
};

exports.getActiveRoom = roomId => {
  const activeRoom = activeRooms.find(activeRoom => activeRoom.roomId === roomId);

  if (activeRoom) {
    return {
      ...activeRoom,
    };
  } else {
    return null;
  }
};

exports.joinActiveRoom = (roomId, newParticipant) => {
  //把當前用戶加入的房間獨立拉出來
  const room = activeRooms.find(room => room.roomId === roomId);
  activeRooms = activeRooms.filter(room => room.roomId !== roomId);

  //更新當前房間的參與者名單
  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipant],
  };

  //將更新後的資料丟回原本的房間列表
  activeRooms.push(updatedRoom);
};

exports.leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find(room => room.roomId === roomId);

  if (activeRoom) {
    const copyOfActiveRoom = { ...activeRoom };

    copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
      participant => participant.socketId !== participantSocketId
    );

    activeRooms = activeRooms.filter(room => room.roomId !== roomId);

    if (copyOfActiveRoom.participants.length > 0) {
      activeRooms.push(copyOfActiveRoom);
    }
  }
};
