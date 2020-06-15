const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products",
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    if (req.session.user) {
      await User.findOne({ email: req.session.user.email });
    }
    const products = await Product.find();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId);
    await req.user.deleteFromCart(product);
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const productsInCart = await req.user
      .populate("cart.items.productId")
      .execPopulate();

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      itemsInCart: productsInCart.cart.items,
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const product = await Product.findById(prodId);
    await req.user.addToCart(product);
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
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
  try {
    const orders = await Order.find({ "user._id": req.session.user._id })
      .populate("items.productId")
      .exec();
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders,
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    isAuthenticated: req.session.isLoggedIn
  });
};
