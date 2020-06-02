const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products"
  });
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);
  res.render("shop/product-detail", {
    product,
    pageTitle: product.title,
    path: "/products"
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await Product.find();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/"
  });
};

exports.deleteCart = async (req, res, next) => {
  await Product.findById(req.body.productId, async product => {
    await req.user.deleteFromCart(product);
  });

  res.redirect("/cart");
};

exports.getCart = async (req, res, next) => {
  const productsInCart = await req.user.getProductCart();

  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    itemsInCart: productsInCart
  });
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  await req.user.addToCart(product);
  res.redirect("/cart");
};

exports.postOrder = async (req, res, next) => {
  try {
    await req.user.addOrder();
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
};

exports.getOrders = async (req, res, next) => {
  const orders = await req.user.getUserOrders();

  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};
