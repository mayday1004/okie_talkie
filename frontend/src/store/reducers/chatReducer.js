import { SET_CHOSEN_CHAT_DETAILS, SET_MESSAGES, SET_CHAT_TYPE } from '../actionType/chatType';

const init = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};

const reducer = (state = init, action) => {
  if (action.type === SET_CHOSEN_CHAT_DETAILS) {
    return {
      ...state,
      chosenChatDetails: action.payload.chatDetails,
      chatType: action.payload.chatType,
    };
  }

  if (action.type === SET_MESSAGES) {
    return {
      ...state,
      messages: action.payload.messages,
    };
  }

  return state;
};

export default reducer;
