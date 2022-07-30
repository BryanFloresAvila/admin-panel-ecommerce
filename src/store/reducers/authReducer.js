import {
  LOGIN,
  LOGOUT,
  VERIFY_TOKEN,
  REQUEST_LOGIN,
  REQUEST_VERIFY_TOKEN,
  ERROR_LOGIN,
  ERROR_VERIFY_TOKEN,
} from '../actions/auth/type';

export const initialState = {
  user: {},
  loadingLogin: false,
  loadingVerifyToken: false,
  isLogged: false,
  verifyToken: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        loadingLogin: true,
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        loadingLogin: false,
        isLogged: true,
        verifyToken: false,
      };
    case ERROR_LOGIN:
      return {
        ...state,
        loadingLogin: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        loadingLogin: false,
        isLogged: false,
        verifyToken: false,
      };
    case REQUEST_VERIFY_TOKEN:
      return {
        ...state,
        loadingVerifyToken: true,
      };
    case VERIFY_TOKEN:
      return {
        ...state,
        loadingVerifyToken: false,
        verifyToken: true,
        isLogged: true,
        user: action.payload,
      };
    case ERROR_VERIFY_TOKEN:
      return {
        ...state,
        loadingVerifyToken: false,
      };
    default:
      return state;
  }
};
