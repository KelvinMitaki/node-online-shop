const Product = require("../models/product");
const getAddProduct = (req, res) => {
  res.render("/admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    isAuthenticated: req.isLoggedIn
  });
};

const getShop = (req, res) => {
  const prods = Product.fetchAll();

  res.render("shop", {
    prods: prods,
    pageTitle: "Shop",
    path: "/",
    hasProducts: prods.length > 0,
    activeShop: true,
    productCSS: true,
    isAuthenticated: req.isLoggedIn
  });
};

module.exports = { getAddProduct, getShop, postAddProduct };
