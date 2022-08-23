import { useCategory } from './context/categoryContext';
import { useProduct } from './context/productContext';
//import { useAuth } from './context/authContext';

export const useCategoryStore = () => {
  const { state, dispatch } = useCategory();
  const { categories: StateCategories, category: StateCategory } = state;
  return { dispatch, StateCategories, StateCategory };
};

export const useProductStore = () => {
  const { state, dispatch } = useProduct();
  const { products: StateProducts, product: StateProduct } = state;
  return { dispatch, StateProducts, StateProduct };
};
