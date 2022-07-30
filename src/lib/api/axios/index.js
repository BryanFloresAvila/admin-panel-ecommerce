import axios from 'axios';
const { REACT_APP_API_URL } = process.env;
export const apiPublic = axios.create({
  baseURL: `${REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export const apiPrivate = (token) =>
  axios.create({
    baseURL: `${REACT_APP_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
export const apiPrivateF = (token) =>
  axios.create({
    baseURL: `${REACT_APP_API_URL}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
