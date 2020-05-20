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
  static deleteProduct(id, productPrice) {
    fs.readFile(cartLocation, (err, files) => {
      if (!err) {
        const fileToBeRemoved = JSON.parse(files).products.find(
          file => file.id === id
        );
        if (!fileToBeRemoved) return;
        const removedProductPrice = fileToBeRemoved.quantity * productPrice;
        const remainingProducts = JSON.parse(files).products.filter(
          prod => prod.id !== id
        );
        const newPrice = JSON.parse(files).totalPrice - removedProductPrice;
        const newCart = { products: remainingProducts, totalPrice: newPrice };
        fs.writeFile(
          cartLocation,
          JSON.stringify(newCart),
          err => err && console.log(err)
        );
      }
    });
  }
  static fetchAllIds(cb) {
    fs.readFile(cartLocation, (err, files) => {
      if (err) return console.log(err);
      cb(JSON.parse(files));
    });
  }
};
