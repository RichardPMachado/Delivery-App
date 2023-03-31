import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestRegister = async ({ name, email, password, role }) => {
  const { data } = await api.post('/register', { name, email, password, role });

  return data;
};

export const requestLogin = async ({ email, password }) => {
  const { data } = await api.post('/login', { email, password });

  return data;
};

export const requestProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const requestUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export default api;
