import axios from 'axios';

export const apiPublic = axios.create({
  baseURL: 'https://backend-project-pam-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export const apiPrivate = (token) =>
  axios.create({
    baseURL: 'https://backend-project-pam-production.up.railway.app/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
