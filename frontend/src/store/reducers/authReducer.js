import Cookies from 'js-cookie';
import { SETUP_USER, CLEAN_USER } from '../actionType/authType';

const user = Cookies.get('user');

const init = {
  user: user ? JSON.parse(user) : null,
};

const reducer = (state = init, action) => {
  if (action.type === SETUP_USER) {
    return { ...state, user: action.payload.user };
  }
  if (action.type === CLEAN_USER) {
    return { ...state, user: null };
  }

  return state;
};

export default reducer;
