import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestLogin = async ({ email, password }) => {
  const { data } = await api.post('/login', { email, password });
  return data;
};

export default api;
