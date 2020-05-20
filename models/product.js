const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "../data", "products.json");

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

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const updatedProducts = [...products];
        const updatedProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        updatedProducts[updatedProductIndex] = this;
        fs.writeFile(
          p,
          JSON.stringify(updatedProducts),
          err => err && console.log(err)
        );
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(
          p,
          JSON.stringify(products),
          err => err && console.log(err)
        );
      }
    });
  }
  static findByIdAndDelete(id) {
    getProductsFromFile(products => {
      const newProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(
        p,
        JSON.stringify(newProducts),
        err => err && console.log(err)
      );
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
