const userService = require("../services/userService");
const { sendTokenToCookie } = require("../utils/sendTokenToCookie");

// register => api/v1/register
exports.register = async (req, res) => {
  const userInfo = req.body;
  const token = await userService.registerService(userInfo);
  sendTokenToCookie(token, 201, res);
};

// login => api/v1/login
exports.login = async (req, res) => {
  const userInfo = req.body;
  const token = await userService.loginService(userInfo);
  sendTokenToCookie(token, 200, res);
};

// current user => api/v1/current_user
exports.currentUser = async (req, res) => {
  res.send(req.cookies.tokenCookie);
};

// logout => api/v1/logout
exports.logout = async (req, res) => {
  res.cookie("tokenCookie", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

// forgot password (not logged in) => api/v1/password/forgot
exports.forgotPassword = async (req, res) => {
  const userInfo = req.body;
  const http = req.protocol;
  const host = req.get("host");
  const message = await userService.forgotPasswordService(userInfo, http, host);
  res.status(200).json({
    message,
  });
};

// update password when forgot password (not logged in) => api/v1/password/update/:token
exports.updatePassword = async (req, res) => {
  // hash url token
  const newPassword = req.body.newPassword;
  const yourToken = req.params.token;

  const response = await userService.updatePasswordService(
    newPassword,
    yourToken,
    res
  );
  res.status(200).json({
    response,
  });
};

// get current details user => api/v1/me
exports.getUserProfile = async (req, res) => {
  const id = req.user.id;
  const userInfo = await userService.getUserProfileService(id);
  res.status(200).json({
    success: true,
    userInfo,
  });
};

// change password (logged) => api/v1/password/change
exports.changePassword = async (req, res) => {
  const id = req.user.id;
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  const user = await userService.changePasswordService(
    id,
    oldPassword,
    newPassword
  );
  res.status(200).json({
    user,
  });
};

// update userInfo => api/v1/me/update
exports.updateProfile = async (req, res) => {
  const id = req.user.id;
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await userService.updateProfileService(id, newUserData);
  res.status(200).json({
    user,
  });
};

// ==========================ADMIN==============================

// get all user => api/v1/admin/users
exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsersService();
  res.status(200).json({
    users,
  });
};

// get user details => api/v1/admin/user/:id
exports.getUserDetails = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserDetailsService(id);
  res.status(200).json({
    user,
  });
};

// update user => api/v1/admin/user/update/:id
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const newUserData = {
    role: req.body.role,
  };
  const user = await userService.updateUserService(id, newUserData);
  res.status(200).json({
    user,
  });
};

// delete user => api/v1/admin/user/:id
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await userService.deleteUserService(id);
  res.status(200).json({
    user,
  });
};
