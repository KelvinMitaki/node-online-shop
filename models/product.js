const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const p = path.join(__dirname, "../data", "products.json");

const { getDb } = require("../utils/database");

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    const result = await getDb().db().collection("products").insertOne(this);
    console.log(result);
  }
  static findByIdAndDelete(id) {
    getProductsFromFile(products => {
      const productToBeDeleted = products.find(prod => prod.id == id);
      if (!productToBeDeleted) return;
      const productPrice = productToBeDeleted.price;
      const newProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(newProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, productPrice);
        }
      });
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);

      cb(product);
    });
  }
};
