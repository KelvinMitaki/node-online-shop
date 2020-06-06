const express = require("express");

const adminController = require("../controllers/admin");
const auth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", auth, adminController.getAddProduct);
router.get("/edit-product/:productId", auth, adminController.getEditProduct);

// /admin/products => GET
router.get("/products", auth, adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", auth, adminController.postAddProduct);
router.post("/edit-product", auth, adminController.postEditProduct);
router.post("/delete-product", auth, adminController.postDeleteProduct);

module.exports = router;
