import { actionTypes } from "../_actions/actionTypes";

const initialState = {
  data: [],
  productCount: 0,
  resperPage: 0,
  reviews: [],
  sucess: "",
};

export const productReducers = (state = initialState, action) => {
  switch (action.type) {
    // Products
    case actionTypes.ALL_PRODUCTS_SUCCESS:
    case actionTypes.DETAILS_PRODUCTS_SUCCESS:
      state.data = action.payload.product;
      state.productCount = action.payload.productCount;
      return {
        ...state,
      };
    // review
    case actionTypes.CREATE_REVIEW:
      state.sucess = action.payload;
      return {
        ...state,
      };

    // clear state
    case actionTypes.CLEAR_STATE:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};

const init = {
  products: [],
  product: {},
  isDeleted: "",
  isUpdated: "",
};

export const adminProductReducers = (state = init, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.CREATE_NEW_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        isDeleted: action.payload,
      };
    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        isUpdated: action.payload,
      };
    default:
      return state;
  }
};
