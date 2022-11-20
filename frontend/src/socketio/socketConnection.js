import io from 'socket.io-client';
import * as config from '../config';
import store from '../store/store';
import { setMessages } from '../store/actions/chatAction';
import { setPendingFriendsInvitations, setFriends, setOnlineUsers } from '../store/actions/friendsAction';
import { showAlert } from '../store/actions/alertAction';
import { logout } from '../store/actions/authAction';
import * as roomHandler from './roomHandler';
import * as webRTCHandler from './webRTCHandler';

let socket = null;
export const connectWithSocketServer = user => {
  socket = io(config.FETCH_URL, {
    auth: {
      token: user.token,
    },
  });

  socket.on('connection', () => {
    console.log('frontend socket connected');
    console.log(socket.id);
  });

  socket.on('friends-invitations', data => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('friends-list', data => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on('online-users', data => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on('private-chat-history', data => {
    store.dispatch(setMessages(data.messages));
  });

  socket.on('room-create', data => {
    roomHandler.newRoomCreated(data);
  });

  socket.on('active-rooms', data => {
    roomHandler.updateActiveRooms(data);
  });

  socket.on('conn-prepare', data => {
    const { connUserSocketId } = data; //加入房間的人的socketId
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
    socket.emit('conn-init', { connUserSocketId: connUserSocketId });
  });

  socket.on('conn-init', data => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on('conn-signal', data => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on('room-participant-left', data => {
    console.log('user left room');
    webRTCHandler.handleParticipantLeftRoom(data);
  });

  socket.on('connect_error', err => {
    store.dispatch(showAlert('error', err.message));
    if (err.message.match(/jwt|token/gi)) {
      setTimeout(async () => {
        await store.dispatch(logout());
      }, 3000);
    }
  });
};

export const sendPrivateMessage = data => {
  socket.emit('private-message', data);
};

export const getPrivateChatHistory = data => {
  socket.emit('private-chat-history', data);
};

export const createNewRoom = () => {
  socket.emit('room-create');
};

export const joinRoom = data => {
  socket.emit('room-join', data);
};

export const signalPeerData = data => {
  socket.emit('conn-signal', data);
};

export const leaveRoom = data => {
  socket.emit('room-leave', data);
};
