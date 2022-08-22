import { useCategory } from './context/categoryContext';
//import { useAuth } from './context/authContext';

export const useCategoryStore = () => {
  const { state, dispatch } = useCategory();
  const { categories: StateCategories, category: StateCategory } = state;
  return { dispatch, StateCategories, StateCategory };
};
