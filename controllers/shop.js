const mongodb = require("mongodb");
const { getDb } = require("../utils/database");

const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products"
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId, product => {
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products"
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
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
  await Product.findById(
    prodId,
    async product => await req.user.addToCart(product)
  );
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders"
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};
