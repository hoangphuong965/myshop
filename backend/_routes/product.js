const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();
const productController = require("../_controllers/productController");

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getSingleProduct);
// router.put(
//   "/review",
//   isAuthenticatedUser,
//   productController.createProductReview
// );
// router.get("/reviews", productController.getProductReview);
// router.delete("/review", productController.deleteProductReview);

// ADMIN
router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.getAdminProducts
);
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.newProduct
);
router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.updateProduct
);
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.deleteProduct
);

module.exports = router;
