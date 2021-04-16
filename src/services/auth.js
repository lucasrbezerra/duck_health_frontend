import api from './api';

export const TOKEN_KEY = "mysecret";
export const isAuth = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getCurrentUser = () => localStorage.getItem('userId');
export const loginAuth = (id, token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem('userId', id);
};
export const logout = async () => {
  await api.post('/logout');
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('userId');
};