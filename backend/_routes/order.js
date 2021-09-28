const express = require("express");
const router = express.Router();

const orderController = require("../_controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/order/new", isAuthenticatedUser, orderController.newOrder);
router.get("/orders/me", isAuthenticatedUser, orderController.myOrder);

router.get(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.getAdminSingleOrders
);
router.get(
  "/admin/orders/all",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.allOrder
);
router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.updateOrder
);
router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.deleteOrder
);

module.exports = router;
