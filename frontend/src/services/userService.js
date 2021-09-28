import axios from "axios";

const config = {
  header: {
    "Content-Type": "application/json",
  },
};

export const loginService = (infoUser) => {
  return axios.post("/api/v1/login", infoUser, config);
};

export const registerService = (infoUser) => {
  return axios.post("/api/v1/register", infoUser, config);
};

export const loadUserService = () => {
  return axios.get("/api/v1/me", config);
};

export const logoutUserService = () => {
  return axios.get("/api/v1/logout", config);
};

export const currentUserService = () => {
  return axios.get("/api/v1/current_user", config);
};

export const changePasswordService = (oldPassword, newPassword) => {
  return axios.put(
    "/api/v1/password/change",
    { oldPassword, newPassword },
    config
  );
};

export const forgotPasswordService = (email) => {
  return axios.post("/api/v1/password/forgot", { email }, config);
};

export const updatePasswordService = (newPassword, token) => {
  return axios.put(`/api/v1/password/update/${token}`, { newPassword }, config);
};

// =============== admin -===============
export const allUserAdminService = () => {
  return axios.get("/api/v1/admin/users", config);
};

export const updateUserAdminService = (id, role) => {
  return axios.put(`/api/v1/admin/user/update/${id}`, { role }, config);
};

export const getSingleUserAdminService = (id) => {
  return axios.get(`/api/v1/admin/user/${id}`, config);
};

export const deleteUserAdminService = (id) => {
  return axios.delete(`/api/v1/admin/user/${id}`, config);
};
