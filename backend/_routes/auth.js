const express = require("express");
const router = express.Router();

const authController = require("../_controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/password/forgot", authController.forgotPassword);
router.put("/password/update/:token", authController.updatePassword);
router.get("/logout", authController.logout);
router.get("/me", isAuthenticatedUser, authController.getUserProfile);
router.put(
  "/password/change",
  isAuthenticatedUser,
  authController.changePassword
);
router.put("/me/update", isAuthenticatedUser, authController.updateProfile);
router.get("/current_user", authController.currentUser);
// ===================ADMIN======================

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  authController.getAllUsers
);

router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  authController.getUserDetails
);

router.put(
  "/admin/user/update/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  authController.updateUser
);

router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  authController.deleteUser
);

module.exports = router;
