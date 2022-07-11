import axios from 'axios';
export const getCategories = async  () => {
  const url = 'https://backend-project-pam-production.up.railway.app/api/v1/categories';
  const response = await  axios.get(url);
  return response;
};
