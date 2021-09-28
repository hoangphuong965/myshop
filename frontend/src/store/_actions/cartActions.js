import { actionTypes } from "./actionTypes";
import { addItemService } from "../../services/cartService";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const response = await addItemService(id);
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: response.data.product._id,
      name: response.data.product.name,
      price: response.data.product.price,
      image: response.data.product.images[0].url,
      stock: response.data.product.stock,
      quantity,
      productId: id,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  dispatch({
    type: actionTypes.CLEAR_STATE,
  });
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
