import { SET_PENDING_FRIENDS_INVITATIONS, SET_FRIENDS, SET_ONLINE_USERS } from '../actionType/friendsType';

const init = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

const reducer = (state = init, action) => {
  if (action.type === SET_PENDING_FRIENDS_INVITATIONS) {
    return { ...state, pendingFriendsInvitations: action.payload.pendingFriendsInvitations };
  }
  if (action.type === SET_FRIENDS) {
    return { ...state, friends: action.payload.friends };
  }
  if (action.type === SET_ONLINE_USERS) {
    return { ...state, onlineUsers: action.payload.onlineUsers };
  }

  return state;
};

export default reducer;
