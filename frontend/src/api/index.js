import axios from 'axios';
import Cookies from 'js-cookie';
import * as config from '../config';

const fetchApi = axios.create({
  baseURL: `${config.FETCH_URL}/api`,
  withCredentials: true,
});

fetchApi.interceptors.request.use(req => {
  if (Cookies.get('user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(Cookies.get('user')).token}`;
  }

  return req;
});

fetchApi.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    console.log(error);
    if (error.response.status === 401) {
      setTimeout(async () => {
        await logout();
        window.location.pathname = '/login';
      }, 3000);
    }
    return Promise.reject(error.response.data);
  }
);

export const setupUser = (endpoint, postData) => fetchApi.post(`/auth/${endpoint}`, postData);
export const logout = () => fetchApi.get('/auth/logout');

export const userUpdated = postData => fetchApi.post('/user/userUpdated', postData);
export const setupFriendInvitation = (endpoint, postData) => fetchApi.post(`/user/${endpoint}`, postData);

export const sendFriendInvitation = postData => fetchApi.post('/user/inviteFriend', postData);
export const acceptFriendInvitation = postData => fetchApi.post('/user/acceptInvite', postData);
export const rejectFriendInvitation = postData => fetchApi.post('/user/rejectInvite', postData);
