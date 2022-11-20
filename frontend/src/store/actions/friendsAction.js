import { SET_PENDING_FRIENDS_INVITATIONS, SET_FRIENDS, SET_ONLINE_USERS } from '../actionType/friendsType';
import { SHOW_ALERT } from '../actionType/alertType';
import * as axios from '../../api';

export const setupFriendInvitation = (endpoint, postData) => async dispatch => {
  try {
    const { data } = await axios.setupFriendInvitation(endpoint, postData);
    dispatch({ type: SHOW_ALERT, payload: { alertType: 'success', messages: data.message } });
  } catch (error) {
    if (error.error?.statusCode === 409) {
      dispatch({ type: SHOW_ALERT, payload: { alertType: 'warning', messages: error.message } });
    } else {
      dispatch({ type: SHOW_ALERT, payload: { alertType: 'error', messages: error.message } });
    }
  }
};

export const setPendingFriendsInvitations = pendingFriendsInvitations => dispatch => {
  return dispatch({ type: SET_PENDING_FRIENDS_INVITATIONS, payload: { pendingFriendsInvitations } });
};

export const setFriends = friends => dispatch => {
  return dispatch({ type: SET_FRIENDS, payload: { friends } });
};

export const setOnlineUsers = onlineUsers => dispatch => {
  return dispatch({ type: SET_ONLINE_USERS, payload: { onlineUsers } });
};
