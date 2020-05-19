const Product = require("../models/product");
const getAddProduct = (req, res) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

const postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/shop");
};
const getShop = (req, res) => {
  const products = Product.fetchAll();

  res.render("shop", {
    products,
    pageTitle: "Shop",
    path: "/shop",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
};

module.exports = { getAddProduct, getShop, postAddProduct };
