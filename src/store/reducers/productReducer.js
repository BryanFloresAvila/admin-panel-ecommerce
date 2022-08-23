import { types } from '../actions/product/type';

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    Object.keys(reducers).forEach((key) => {
      newState[key] = reducers[key](state[key], action);
    });
    return newState;
  };
};

const initialStateProducts = {
  products: [],
  loading: false,
  error: null,
};
const initialStateProduct = {
  product: {},
  loading: false,
  error: null,
};

const productsReducer = (state = initialStateProducts, action) => {
  switch (action.type) {
    case types.ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ALL_PRODUCT_SUCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case types.ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const productReducer = (state = initialStateProduct, action) => {
  switch (action.type) {
    case types.SELECT_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case types.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_PRODUCT_SUCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PRODUCT_SUCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_PRODUCT_SUCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const initialState = {
  products: initialStateProducts,
  product: initialStateProduct,
};

export const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
});
