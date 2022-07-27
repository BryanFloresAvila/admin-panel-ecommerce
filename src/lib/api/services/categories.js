import { apiPublic, apiPrivate } from '../axios/index';
import {token} from '../../../utils/auth';
export const getCategories =  () => {
  return  apiPublic.get('/categories');
};
export const getCategory =  (id) => {
  return  apiPublic.get(`/categories/${id}`);
};
export const createCategory =  (category) => {
  return  apiPrivate(token.get()).post('/categories/create', category);
};
export const updateCategory =  (id, category) => {
  return  apiPrivate(token.get()).put(`/categories/${id}`, category);
};
export const deleteCategory =  (id) => {
  return  apiPrivate(token.get()).delete(`/categories/${id}`);
};
