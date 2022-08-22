import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { initialState, rootReducer } from '../reducers/categoryReducer';

const CategoryContext = createContext({});

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = useMemo(() => ({ state, dispatch }), [state]);
  return <CategoryContext.Provider value={store}>{children}</CategoryContext.Provider>;
};
