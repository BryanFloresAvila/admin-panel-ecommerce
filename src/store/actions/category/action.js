import { types } from './type';
/*
  Actions:
    - getCategories: get all categories
    - getCategoriesSuccess: get all categories success
    - getCategoriesFail: get all categories fail
    - selectCategory: select category
    - addCategory: add category
    - addCategorySuccess: add category success
    - addCategoryFail: add category fail
    - updateCategory: update category
    - updateCategorySuccess: update category success
    - updateCategoryFail: update category fail
    - deleteCategory: delete category
    - deleteCategorySuccess: delete category success
    - deleteCategoryFail: delete category fail
*/

export const getCategories = () => ({
  type: types.ALL_CATEGORY_REQUEST,
});

export const getCategoriesSuccess = (categories) => ({
  type: types.ALL_CATEGORY_SUCESS,
  payload: categories,
});

export const getCategoriesFail = (error) => ({
  type: types.ALL_CATEGORY_FAIL,
  payload: error,
});

export const selectCategory = (category) => ({
  type: types.SELECT_CATEGORY,
  payload: category,
});

export const addCategory = () => ({
  type: types.ADD_CATEGORY,
});

export const addCategorySuccess = () => ({
  type: types.ADD_CATEGORY_SUCCESS,
});

export const addCategoryFail = (error) => ({
  type: types.ADD_CATEGORY_FAIL,
  payload: error,
});

export const updateCategory = () => ({
  type: types.UPDATE_CATEGORY,
});

export const updateCategorySuccess = () => ({
  type: types.UPDATE_CATEGORY_SUCCESS,
});

export const updateCategoryFail = (error) => ({
  type: types.UPDATE_CATEGORY_FAIL,
  payload: error,
});

export const deleteCategory = () => ({
  type: types.DELETE_CATEGORY_REQUEST,
});

export const deleteCategorySuccess = () => ({
  type: types.DELETE_CATEGORY_SUCCESS,
});

export const deleteCategoryFail = (error) => ({
  type: types.DELETE_CATEGORY_FAIL,
  payload: error,
});
