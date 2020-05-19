const fs = require("fs");
const path = require("path");

let products = [];
const storagePath = path.join(__dirname, "../", "data", "products.json");
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    fs.readFile(storagePath, (err, file) => {
      if (!err) {
        products = JSON.parse(file);
      }
      products.push(this);
      fs.writeFile(storagePath, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }
  static fetchAll() {
    try {
      const data = fs.readFileSync(storagePath);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
};
