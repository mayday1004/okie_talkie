import { SHOW_ALERT, CLEAR_ALERT } from '../actionType/alertType';

export const showAlert = (alertType, messages) => dispatch => {
  dispatch({ type: SHOW_ALERT, payload: { alertType, messages } });
};

export const clearAlert = () => dispatch => {
  dispatch({ type: CLEAR_ALERT, payload: { alertType: '', messages: '' } });
};
