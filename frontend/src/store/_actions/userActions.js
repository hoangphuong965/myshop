import { actionTypes } from "./actionTypes";
import {
  loginService,
  registerService,
  loadUserService,
  logoutUserService,
  currentUserService,
  changePasswordService,
  forgotPasswordService,
  updatePasswordService,
  allUserAdminService,
  updateUserAdminService,
  getSingleUserAdminService,
  deleteUserAdminService,
} from "../../services/userService";

export const login = (email, password, callBack) => async (dispatch) => {
  try {
    const infoUser = { email, password };
    const response = await loginService(infoUser);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: response.data.argument_token_user,
    });
    callBack();
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAIL, payload: error });
  }
};

export const register =
  (name, email, password, callBack) => async (dispatch) => {
    try {
      const infoUser = { name, email, password };
      const response = await registerService(infoUser);
      console.log(response.data);
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: response.data.argument_token_user,
      });
      callBack();
    } catch (error) {
      dispatch({ type: actionTypes.REGISTER_FAIL, payload: error });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    const response = await loadUserService();
    dispatch({
      type: actionTypes.LOAD_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_USER_FAIL,
      payload: error,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await logoutUserService();
    dispatch({
      type: actionTypes.LOGOUT_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGOUT_USER_FAIL,
      payload: error,
    });
  }
};

export const fetchUser = () => async (dispatch) => {
  const res = await currentUserService();
  dispatch({
    type: actionTypes.CURRENT_USER,
    payload: res.data,
  });
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    const res = await changePasswordService(oldPassword, newPassword);
    console.log(res.data);
    dispatch({
      type: actionTypes.CHANGE_PASSWORD,
      payload: res.data.user,
    });
  };

export const forgotPassword = (email) => async (dispatch) => {
  const res = await forgotPasswordService(email);
  dispatch({
    type: actionTypes.SEND_MAIL_FORGOT_PASSWORD,
    payload: res.data.message,
  });
};

export const updatePassword =
  (newPassword, token, callBack) => async (dispatch) => {
    const res = await updatePasswordService(newPassword, token);
    dispatch({
      type: actionTypes.UPDATE_NEW_PASSWORD,
      payload: res.data.response,
    });
    callBack();
  };

// ====================== ADMIN ==================
export const allUserAdmin = () => async (dispatch) => {
  const response = await allUserAdminService();
  dispatch({
    type: actionTypes.ALL_USERS,
    payload: response.data.users,
  });
};

export const updateUserAdmin = (id, role, callBack) => async (dispatch) => {
  const response = await updateUserAdminService(id, role);
  dispatch({
    type: actionTypes.UPDATE_USER_ADMIN,
    payload: response.data,
  });
  callBack();
};

export const getSingleUserAdmin = (id) => async (dispatch) => {
  const response = await getSingleUserAdminService(id);
  dispatch({
    type: actionTypes.GET_SINGLE_USER_ADMIN,
    payload: response.data.user,
  });
};

export const deleteUserAdmin = (id, callBack) => async (dispatch) => {
  const response = await deleteUserAdminService(id);
  dispatch({
    type: actionTypes.DELETE_USER_ADMIN,
    payload: response.data,
  });
  callBack();
};

export const clearState = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_STATE,
  });
};
