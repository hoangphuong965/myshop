import { actionTypes } from "../_actions/actionTypes";

const init = {
  cartItems: [],
  shippingInfo: {},
};

export const cartReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      const found = state.cartItems.find((element) => element.id === item.id);
      if (found) {
        return {
          ...state,
          cartItems: state.cartItems.map((element) =>
            element.id === item.id ? item : element
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.payload),
      };

    case actionTypes.CLEAR_STATE:
      return {
        ...state,
      };

    case actionTypes.SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
