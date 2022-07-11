import axios from 'axios';

export const getProducts = async () => {
    const URL = 'https://backend-project-pam-production.up.railway.app/api/v1/products';
    const response = await axios.get(URL);
   return response.data; 
     
}