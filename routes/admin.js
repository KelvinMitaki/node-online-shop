const express = require("express");

const adminController = require("../controllers/admin");
const auth = require("../middleware/is-auth");
const { check } = require("express-validator");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", auth, adminController.getAddProduct);
router.get("/edit-product/:productId", auth, adminController.getEditProduct);

// /admin/products => GET
router.get("/products", auth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  check("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please enter a title with more than three characters"),

  check("price").trim().isFloat().withMessage("Please enter a decimal"),
  check("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please enter a description with more than two characters"),
  auth,
  adminController.postAddProduct
);
router.post(
  "/edit-product",
  check("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please enter a title with more than three characters"),

  check("price").trim().isFloat().withMessage("Please enter a decimal"),
  check("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please enter a description with more than two characters"),
  auth,
  adminController.postEditProduct
);
router.post("/delete-product", auth, adminController.postDeleteProduct);

module.exports = router;
