const fs = require("fs");
const path = require("path");

const cartLocation = path.join(__dirname, "../", "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // FETCH THE PREVIOUS CART
    fs.readFile(cartLocation, (error, file) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(file);
      }
      // FIND EXISTING PRODUCT IF ONE
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // ADD NEW PRODUCT IF NONE INCREASE QUANTITY IF EXISTING
      if (existingProduct) {
        updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1
        };
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(
        cartLocation,
        JSON.stringify(cart),
        err => err && console.log(err)
      );
    });
  }
};
