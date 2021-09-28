import { actionTypes } from "../_actions/actionTypes";

const init = {
  newOrder: {},
  myOrder: [],
  allOrderAdmin: [],
  updateOrder: {},
  singleOrders: {},
  isDelete: "",
};

export const orderReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER:
      return {
        ...state,
        newOrder: action.payload,
      };
    case actionTypes.MY_ORDER:
      return {
        ...state,
        myOrder: action.payload.myOrder,
      };
    case actionTypes.ALL_ORDERS:
      return {
        ...state,
        allOrderAdmin: action.payload,
      };
    case actionTypes.UPDATE_ORDERS:
      return {
        ...state,
        updateOrder: action.payload,
      };
    case actionTypes.SINGLE_ORDERS:
      return {
        ...state,
        singleOrders: action.payload.singleOrder,
      };
    case actionTypes.DELETE_ORDERS:
      return {
        ...state,
        isDelete: action.payload,
      };
    case actionTypes.CLEAR_STATE:
      return {
        ...state,
        singleOrders: "",
      };
    default:
      return state;
  }
};
