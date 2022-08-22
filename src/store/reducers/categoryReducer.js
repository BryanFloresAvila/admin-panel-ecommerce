import { types } from '../actions/category/type';

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    Object.keys(reducers).forEach((key) => {
      newState[key] = reducers[key](state[key], action);
    });
    return newState;
  };
};

const intialStateCategories = {
  categories: [],
  loading: false,
  error: null,
};

const initalStateCategory = {
  category: {},
  loading: false,
  error: null,
};

const categoriesReducer = (state = intialStateCategories, action) => {
  switch (action.type) {
    case types.ALL_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ALL_CATEGORY_SUCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case types.ALL_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const categoryReducer = (state = initalStateCategory, action) => {
  switch (action.type) {
    case types.SELECT_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case types.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_CATEGORY_SUCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    case types.ADD_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_CATEGORY_SUCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_CATEGORY_SUCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_CATEGORY_FAIL:
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
  categories: intialStateCategories,
  category: initalStateCategory,
};
export const rootReducer = combineReducers({
  categories: categoriesReducer,
  category: categoryReducer,
});
