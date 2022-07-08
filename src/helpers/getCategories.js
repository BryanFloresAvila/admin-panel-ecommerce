import axios from 'axios';
export const getCategories = () => {
  const url = 'https://backend-project-pam-production.up.railway.app/api/v1/categories';
  const response = axios.get(url);
  return response;
};
