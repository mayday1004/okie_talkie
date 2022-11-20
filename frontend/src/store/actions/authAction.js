import Cookies from 'js-cookie';
import * as config from '../../config';
import { SETUP_USER } from '../actionType/authType';
import { SHOW_ALERT } from '../actionType/alertType';
import * as axios from '../../api';

export const setupUser = (endpoint, postData) => async dispatch => {
  try {
    const { data } = await axios.setupUser(endpoint, postData);
    const { _id, username, email, image, token } = data.user;
    const cookieInfo = JSON.stringify({ _id, username, email, image, token });
    Cookies.set('user', cookieInfo, { expires: config.COOKIES_EXPIRE });
    dispatch({ type: SETUP_USER, payload: { user: { _id, username, email, image, token } } });
    dispatch({
      type: SHOW_ALERT,
      payload: {
        alertType: 'success',
        messages: `${endpoint[0].toUpperCase() + endpoint.slice(1)} Success, Redirect...`,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: SHOW_ALERT, payload: { alertType: 'error', messages: error.message } });
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.logout();
    window.location.pathname = '/login';
  } catch (error) {
    console.log(error);
    dispatch({ type: SHOW_ALERT, payload: { alertType: 'error', messages: error.message } });
  }
};

export const userUpdated = postData => async dispatch => {
  try {
    const { data } = await axios.userUpdated(postData);
    console.log(data);
    const { _id, username, email, image, token } = data.user;
    const cookieInfo = JSON.stringify({ _id, username, email, image, token });
    Cookies.remove('user');
    Cookies.set('user', cookieInfo, { expires: config.COOKIES_EXPIRE });
    dispatch({ type: SETUP_USER, payload: { user: { _id, username, email, image, token } } });
    dispatch({
      type: SHOW_ALERT,
      payload: {
        alertType: 'success',
        messages: 'Update Success',
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: SHOW_ALERT, payload: { alertType: 'error', messages: error.message } });
  }
};
