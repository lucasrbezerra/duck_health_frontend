import api from './api';

export const TOKEN_KEY = "mysecret";
export const isAuth = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getCurrentUser = () => localStorage.getItem('userId');
export const getCurrentFullName = () => localStorage.getItem('full_name');
export const getCurrentUserClass = () => localStorage.getItem('user_class');

export const loginAuth = (id, full_name, user_class, token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem('userId', id);
  localStorage.setItem('full_name', full_name);
  localStorage.setItem('user_class', user_class);

};
export const logout = async () => {
  await api.post('/logout');
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('userId');
  localStorage.removeItem('full_name');
  localStorage.removeItem('user_class');

};