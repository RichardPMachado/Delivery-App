import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestRegister = async ({ name, email, password }) => {
  const { data } = await api.post('/register', { name, email, password });

  return data;
};

export const requestAdmRegister = async ({ name, email, password, role }) => {
  const { data } = await api.post('/adm/register', { name, email, password, role });

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

export const requestSalesByUser = async (id) => {
  const { data } = await api.get(`/sales/user/${id}`);
  return data;
};

export const requestSalesBySeller = async (id) => {
  const { data } = await api.get(`/sales/seller/${id}`);
  return data;
};

export const requestSales = async () => {
  const { data } = await api.get('/sales');
  return data;
};

export const requestSaleById = async (id) => {
  const { data } = await api.get(`/sale/${id}`);
  return data;
};

export const attSale = async (id, { status }) => {
  const { data } = await api.put(`/sale/${id}`, { status });
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.authorization = token;
};

export const requestNewSale = async (
  { email, sellerId, totalPrice, deliveryAddress, deliveryNumber, products },
) => {
  const { data } = await api.post(
    '/customer/checkout',
    { email, sellerId, totalPrice, deliveryAddress, deliveryNumber, products },
  );
  return data;
};

export default api;
