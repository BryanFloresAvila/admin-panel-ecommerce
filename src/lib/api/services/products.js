import { apiPublic, apiPrivate, apiPrivateF } from '../axios/index';
import { token } from '../../../utils/auth';

export const getProducts = () => {
  return apiPublic.get('/products');
};
export const getProduct = (id) => {
  return apiPublic.get(`/products/${id}`);
};
export const createProduct = (product) => {
  return apiPrivateF(token.get()).post('/products/create', product);
};
export const updateProduct = (id, product) => {
  return apiPrivateF(token.get()).put(`/products/${id}`, product);
};
export const deleteProduct = (id) => {
  return apiPrivate(token.get()).delete(`/products/${id}`);
};
