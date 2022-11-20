const bunyan = require('bunyan');
const config = require('../config');
const { socketProtect } = require('../middlewares/authentication');
const connectionHandler = require('../socketio/connectionHandler');
const friendsListHandler = require('../socketio/friendsListHandler');
const messageHandler = require('../socketio/messageHandler');
const roomHandler = require('../socketio/roomHandler');

const log = bunyan.createLogger({ name: 'socket.io' });

// Socket後端連線設置:一旦與前端連線上了會做什麼
const connectSocket = server => {
  const io = require('socket.io')(server, {
    cors: {
      origin: config.CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    //middleware:對每次傳輸進行token驗證
    io.use((socket, next) => {
      socketProtect(socket, next);
      connectionHandler.setSocketServerInstance(io);
    });

    if (socket.user) {
      log.info(`${socket.id} Connected to socket.io successful`);
      //管理連進來的用戶:建立所有連線用戶名單
      connectionHandler.addNewConnectorToList(socket);
      //對於連進來的用戶:1.顯示用戶好友名單 2.好友中誰是上線的 3.確認好友邀請名單 4.取得正在直播的房間
      friendsListHandler.updateFriendsList(socket.user.id);
      friendsListHandler.checkOnlineUsers();
      friendsListHandler.updatePendingInvite(socket.user.id);
      setTimeout(() => {
        roomHandler.getActiveRoomWhenConnect(socket.id);
      }, [500]);

      //當用戶開啟一個聊天室:1.載入聊天室歷史訊息 2.用戶發送訊息
      socket.on('private-chat-history', receiverId => {
        messageHandler.privateHistoryMessages(socket, receiverId);
      });
      socket.on('private-message', data => {
        messageHandler.sendPrivateMessages(socket, data);
      });
      // Room事件
      socket.on('room-create', () => {
        roomHandler.roomCreateHandler(socket);
      });
      socket.on('room-join', data => {
        roomHandler.roomJoinHandler(socket, data);
      });
      socket.on('room-leave', data => {
        roomHandler.roomLeaveHandler(socket, data);
      });

      socket.on('conn-init', data => {
        roomHandler.roomInitializeConnectionHandler(socket, data);
      });
      socket.on('conn-signal', data => {
        roomHandler.roomSignalingDataHandler(socket, data);
      });

      //用戶離開後將他從連線名單移除
      socket.on('disconnect', () => {
        log.warn(`${socket.id} Disconnected to socket.io`);
        connectionHandler.removeConnectorFromList(socket);
      });

      setInterval(() => {
        friendsListHandler.checkOnlineUsers();
      }, [1000 * 20]);
    }
  });
};

module.exports = connectSocket;
