import axios from "axios";
import { actionTypes } from "../_actions/actionTypes";

const config = {
  header: {
    "Content-type": "application/json",
  },
};

export const createOrder = (order) => async (dispatch) => {
  const response = await axios.post("/api/v1/order/new", order, config);
  dispatch({
    type: actionTypes.CREATE_ORDER,
    payload: response.data,
  });
};

export const myOrder = () => async (dispatch) => {
  const response = await axios.get("/api/v1/orders/me", config);
  dispatch({
    type: actionTypes.MY_ORDER,
    payload: response.data.orders,
  });
};

export const allOrderAdmin = () => async (dispatch) => {
  const response = await axios.get("/api/v1/admin/orders/all", config);
  dispatch({
    type: actionTypes.ALL_ORDERS,
    payload: response.data.allOrder.orders,
  });
};

export const updateOrderAdmin =
  (id, orderStatus, callBack) => async (dispatch) => {
    const response = await axios.put(
      `/api/v1/admin/order/${id}`,
      { orderStatus },
      config
    );
    dispatch({
      type: actionTypes.UPDATE_ORDERS,
      payload: response.data,
    });
    callBack();
  };

export const getSingleOrderAdmin = (id) => async (dispatch) => {
  const response = await axios.get(`/api/v1/admin/order/${id}`);
  dispatch({
    type: actionTypes.SINGLE_ORDERS,
    payload: response.data.order,
  });
};

export const deleteOrderAdmin = (id, callBack) => async (dispatch) => {
  const response = await axios.delete(`/api/v1/admin/order/${id}`, config);
  dispatch({
    type: actionTypes.DELETE_ORDERS,
    payload: response.data,
  });
  callBack();
};

export const clearState = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_STATE,
  });
};
