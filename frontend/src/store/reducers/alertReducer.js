import { SHOW_ALERT, CLEAR_ALERT } from '../actionType/alertType';

const init = {
  alertType: '',
  messages: '',
  showAlert: false,
};

const reducer = (state = init, action) => {
  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      alertType: action.payload.alertType,
      messages: action.payload.messages,
      showAlert: true,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      alertType: '',
      messages: '',
      showAlert: false,
    };
  }

  return state;
};

export default reducer;
