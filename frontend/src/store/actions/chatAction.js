import { SET_CHOSEN_CHAT_DETAILS, SET_MESSAGES } from '../actionType/chatType';

export const setChosenChatDetail = (chatType, chatDetails) => dispatch => {
  dispatch({ type: SET_CHOSEN_CHAT_DETAILS, payload: { chatType, chatDetails } });
};

export const setMessages = messages => dispatch => {
  dispatch({ type: SET_MESSAGES, payload: { messages } });
};
