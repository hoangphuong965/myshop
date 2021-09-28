import {
  getAllProductService,
  getDetailProductService,
  getAllAdminProductService,
  createNewProductService,
  deleteProductService,
  updateProductService,
} from "../../services/productService";
import { actionTypes } from "./actionTypes";

export const getAllProduct = () => async (dispatch) => {
  try {
    const { data } = await getAllProductService();
    dispatch({
      type: actionTypes.ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ALL_PRODUCTS_FAIL,
      payload: error,
    });
  }
};

export const getDetailProduct = (id) => async (dispatch) => {
  try {
    const { data } = await getDetailProductService(id);
    dispatch({
      type: actionTypes.DETAILS_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DETAILS_PRODUCTS_FAIL,
      payload: error,
    });
  }
};

export const getAllAdminProduct = () => async (dispatch) => {
  const response = await getAllAdminProductService();
  dispatch({
    type: actionTypes.ADMIN_ALL_PRODUCTS,
    payload: response.data.products,
  });
};

export const createNewProduct = (productData, callBack) => async (dispatch) => {
  const response = await createNewProductService(productData);
  dispatch({
    type: actionTypes.CREATE_NEW_PRODUCT,
    payload: response.data,
  });
  callBack();
};

export const deleteProduct = (id, callBack) => async (dispatch) => {
  const response = await deleteProductService(id);
  console.log(response.data);
  dispatch({
    type: actionTypes.DELETE_PRODUCT,
    payload: response.data,
  });
  callBack();
};

export const updateProduct = (id, data, callBack) => async (dispatch) => {
  const response = await updateProductService(id, data);
  dispatch({
    type: actionTypes.UPDATE_PRODUCT,
    payload: response.data,
  });
  callBack();
};

export const clearState = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_STATE,
  });
};
