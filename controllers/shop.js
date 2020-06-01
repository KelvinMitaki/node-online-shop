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

exports.deleteCart = (req, res, next) => {
  Product.findById(req.body.productId, product =>
    Cart.deleteFromCart(req.body.productId, product.price)
  );

  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  const itemsInCart = [];
  Product.fetchAll(products => {
    Cart.fetchAllIds(cart => {
      const cartProducts = cart.products;

      for (let cartProduct of cartProducts) {
        const cartItems = products.filter(
          product => product.id === cartProduct.id
        );
        itemsInCart.push({ ...cartItems[0], quantity: cartProduct.quantity });
      }

      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        itemsInCart
      });
    });
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

// Say I have two arrays

// **ARRAY 1:**

// ```
// [
//   {
//     id: '0.3385486959963888',
//     title: 'product 1'
//   },
//   {
//     id: '0.5307392257622798',
//     title: 'product 2'
//   },
//   {
//     id: '0.036769713944472926',
//     title: 'product 3'
//   }
// ]
// ```
// **ARRAY 2:**
// ```
// [
//   { id: '0.3385486959963888', quantity: 2 },
//   { id: '0.5307392257622798', quantity: 3 }
// ]
// ```
// I want to compare them and return from array 1 only the products that the IDs are matching the IDs in array two, how can I do that
