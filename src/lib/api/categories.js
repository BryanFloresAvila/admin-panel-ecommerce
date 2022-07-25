import { apiPublic, apiPrivate } from './index';

export const getCategories = async () => {
  return await apiPublic.get('/categories');
};
export const getCategory = async (id) => {
  return await apiPublic.get(`/categories/${id}`);
};
export const createCategory = async (category, token) => {
  return await apiPrivate(token).post('/categories', category);
};
export const updateCategory = async (id, category, token) => {
  return await apiPrivate(token).put(`/categories/${id}`, category);
};
export const deleteCategory = async (id, token) => {
  return await apiPrivate(token).delete(`/categories/${id}`);
};
