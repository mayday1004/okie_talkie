const connectionHandler = require('./connectionHandler');
const trycatch = require('../utils/trycatch');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');

//取得歷史訊息
exports.privateHistoryMessages = trycatch(async (socket, receiverId) => {
  const currentUserId = socket.user.id;

  const currentChat = await Chat.findOne({
    participants: { $all: [currentUserId, receiverId] },
    type: 'PRIVATE',
  });
  updateChatRender(currentChat, socket.id);
});

//新訊息存進DB
exports.sendPrivateMessages = trycatch(async (socket, data) => {
  const currentUserId = socket.user.id;
  const { receiverUserId, content } = data;

  const newMessage = await Message.create({
    content: content,
    author: currentUserId,
    type: 'PRIVATE',
  });

  //先判斷當前聊天室是否已經對話過?
  const isChatExist = await Chat.findOne({
    participants: { $all: [currentUserId, receiverUserId] },
  });

  //否:新建一個chat
  if (!isChatExist) {
    const newChat = await Chat.create({
      messages: [newMessage._id],
      participants: [currentUserId, receiverUserId],
    });

    await newChat.populate({
      path: 'messages',
      model: 'Message',
      populate: {
        path: 'author',
        model: 'User',
        select: 'image username _id',
      },
    });

    updateChatRender(newChat);
  } else {
    //是:將新訊息push進chat.massages
    const showNewMessage = await Chat.findByIdAndUpdate(
      isChatExist._id,
      { $push: { messages: newMessage._id.toString() } },
      { new: true }
    );
    updateChatRender(showNewMessage);
  }
});

//更新聊天室畫面
const updateChatRender = trycatch(async (currentChat, currentSocketId = null) => {
  if (currentChat) {
    const io = connectionHandler.getSocketServerInstance();

    if (currentSocketId) {
      // initial update of chat history
      return io.to(currentSocketId).emit('private-chat-history', {
        messages: currentChat.messages,
        participants: currentChat.participants,
      });
    }

    // 確認聊天對象是否在線:是)對方也同步更新訊息畫面
    currentChat.participants.forEach(userId => {
      const activeConnections = connectionHandler.getActiveConnections(userId.toString());

      activeConnections.forEach(socketId => {
        io.to(socketId).emit('private-chat-history', {
          messages: currentChat.messages,
          participants: currentChat.participants,
        });
      });
    });
  } else {
    const io = connectionHandler.getSocketServerInstance();
    if (currentSocketId) {
      // initial update of chat history
      return io.to(currentSocketId).emit('private-chat-history', {
        messages: [],
      });
    }
  }
});
