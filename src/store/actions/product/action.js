import { types } from './type';
/*
    Actions:
        - getProducts: get all products
        - getProductsSuccess: get all products success
        - getProductsFail: get all products fail
        - selectProduct: select product
        - addProduct: add product
        - addProductSuccess: add product success
        - addProductFail: add product fail
        - updateProduct: update product
        - updateProductSuccess: update product success
        - updateProductFail: update product fail
        - deleteProduct: delete product
        - deleteProductSuccess: delete product success
        - deleteProductFail: delete product fail
*/

export const getProducts = () => ({
  type: types.ALL_PRODUCT_REQUEST,
});

export const getProductsSuccess = (products) => ({
  type: types.ALL_PRODUCT_SUCESS,
  payload: products,
});

export const getProductsFail = (error) => ({
  type: types.ALL_PRODUCT_FAIL,
  payload: error,
});

export const selectProduct = (product) => ({
  type: types.SELECT_PRODUCT,
  payload: product,
});

export const addProduct = () => ({
  type: types.ADD_PRODUCT,
});

export const addProductSuccess = () => ({
  type: types.ADD_PRODUCT_SUCESS,
});

export const addProductFail = (error) => ({
  type: types.ADD_PRODUCT_FAIL,
  payload: error,
});

export const updateProduct = () => ({
  type: types.UPDATE_PRODUCT,
});

export const updateProductSuccess = () => ({
  type: types.UPDATE_PRODUCT_SUCESS,
});

export const updateProductFail = (error) => ({
  type: types.UPDATE_PRODUCT_FAIL,
  payload: error,
});

export const deleteProduct = () => ({
  type: types.DELETE_PRODUCT,
});

export const deleteProductSuccess = () => ({
  type: types.DELETE_PRODUCT_SUCESS,
});

export const deleteProductFail = (error) => ({
  type: types.DELETE_PRODUCT_FAIL,
  payload: error,
});
