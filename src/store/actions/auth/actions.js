import {
  LOGIN,
  LOGOUT,
  VERIFY_TOKEN,
  REQUEST_LOGIN,
  REQUEST_VERIFY_TOKEN,
  ERROR_LOGIN,
  ERROR_VERIFY_TOKEN,
} from './type';
import {login as serviceLogin, verifyToken as serviceVerifyToken} from '../../../lib/api/services/login';
import { token } from '../../../utils/auth';

export const login = (dispatch, loginPayload) => {
  console.log('executing login...');
  dispatch({ type: REQUEST_LOGIN });
  serviceLogin(loginPayload.email, loginPayload.password)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.user.rol === 'admin') {
          dispatch({
            type: LOGIN,
            payload: response.data.user,
          });
          token.set(response.data.token);
        } else {
          throw new Error('You are not an admin');
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: ERROR_LOGIN,
      });
      if (error.code) console.log(error.response.data.message);
      else console.log(error.message);
    });
};
export const logout = (dispatch) => {
  token.remove();
  dispatch({
    type: LOGOUT,
  });
};
export const verifyToken = (dispatch) => {
  const tokenStorage = token.get() ? token.get() : null;
  if (tokenStorage != null) {
    dispatch({ type: REQUEST_VERIFY_TOKEN });
    serviceVerifyToken(tokenStorage)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: VERIFY_TOKEN,
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: ERROR_VERIFY_TOKEN,
        });
        token.remove();
        console.log(error);
      });
  }
};
