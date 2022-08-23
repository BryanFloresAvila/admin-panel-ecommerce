import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { initialState, rootReducer } from '../reducers/productReducer';

const ProductContext = createContext({});

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = useMemo(() => ({ state, dispatch }), [state]);
  return <ProductContext.Provider value={store}>{children}</ProductContext.Provider>;
};
