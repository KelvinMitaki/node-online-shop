const router = require("express").Router();
const { getAddProduct, postAddProduct } = require("../controllers/products");

router.get("/", (req, res) => {
  res.redirect("/shop");
});

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

module.exports = { router };
