import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  productReducers,
  adminProductReducers,
} from "../store/_reducers/productReducers";
import {
  authReducer,
  changePasswordReducer,
  forgotPasswordReducer,
  updatePasswordReducer,
  usersAdminReducer,
} from "../store/_reducers/userReducers";
import { cartReducer } from "../store/_reducers/cartReducers";
import { orderReducer } from "../store/_reducers/orderReducers";

const reducer = combineReducers({
  products: productReducers,
  adminProduct: adminProductReducers,
  auth: authReducer,
  changePassword: changePasswordReducer,
  forgotPassword: forgotPasswordReducer,
  updatePassword: updatePasswordReducer,
  usersAdmin: usersAdminReducer,
  cart: cartReducer,
  order: orderReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middlWare = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middlWare));
export default store;
