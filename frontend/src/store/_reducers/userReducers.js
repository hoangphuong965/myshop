import { actionTypes } from "../_actions/actionTypes";

const initialStateAuthReducer = {
  user: "",
  errCode: "",
  errMessage: "",
  isAuthenticated: "",
  fetchUser: "",
  role: "",
};
export const authReducer = (state = initialStateAuthReducer, action) => {
  switch (action.type) {
    // CURRENT USER
    case actionTypes.CURRENT_USER:
      state.fetchUser = action.payload || false;
      state.isAuthenticated = action.payload.success;
      return {
        ...state,
      };
    // LOGIN
    case actionTypes.LOGIN_SUCCESS:
      state.isAuthenticated = action.payload.success;
      state.errCode = action.payload.errCode;
      state.errMessage = action.payload.errMessage;
      state.role = action.payload.role;
      return {
        ...state,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
      };

    // REGISTER
    case actionTypes.REGISTER_SUCCESS:
      state.isAuthenticated = action.payload.success;
      state.errCode = action.payload.errCode;
      state.errMessage = action.payload.errMessage;
      return {
        ...state,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
      };

    // LOAD USER
    case actionTypes.LOAD_USER_SUCCESS:
      state.user = action.payload.userInfo.user;
      state.isAuthenticated = action.payload.success;
      return {
        ...state,
      };
    case actionTypes.LOAD_USER_FAIL:
      return {
        ...state,
      };

    // LOGOUT USER
    case actionTypes.LOGOUT_USER_SUCCESS:
      state.errMessage = action.payload.message;
      state.isAuthenticated = false;
      return {
        ...state,
      };
    case actionTypes.LOGOUT_USER_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

const initialStateChangePassword = {
  isChangedPassword: false,
  message: "",
  errCode: "",
};
export const changePasswordReducer = (
  state = initialStateChangePassword,
  action
) => {
  switch (action.type) {
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        isChangedPassword: action.payload.success,
        message: action.payload.message,
        errCode: action.payload.errCode,
      };
    default:
      return state;
  }
};

const initialStateForgotPassword = {
  message: "",
};
export const forgotPasswordReducer = (
  state = initialStateForgotPassword,
  action
) => {
  switch (action.type) {
    case actionTypes.SEND_MAIL_FORGOT_PASSWORD:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

const initialStateUpdatePasswordReducer = {
  message: "",
};
export const updatePasswordReducer = (
  state = initialStateUpdatePasswordReducer,
  action
) => {
  switch (action.type) {
    case actionTypes.UPDATE_NEW_PASSWORD:
      return {
        ...state,
        message: action.payload.message,
      };

    default:
      return state;
  }
};

const initUsersAdmin = {
  users: [],
  isUserUpdated: "",
  isUserDeleted: "",
  user: {},
};

export const usersAdminReducer = (state = initUsersAdmin, action) => {
  switch (action.type) {
    case actionTypes.ALL_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case actionTypes.GET_SINGLE_USER_ADMIN:
      return {
        ...state,
        user: action.payload.user,
      };
    case actionTypes.UPDATE_USER_ADMIN:
      return {
        ...state,
        isUserUpdated: action.payload,
      };
    case actionTypes.DELETE_USER_ADMIN:
      return {
        ...state,
        isUserDeleted: action.payload,
      };
    case actionTypes.CLEAR_STATE:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
