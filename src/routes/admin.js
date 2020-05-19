const router = require("express").Router();

const products = [];

router.get("/", (req, res) => {
  res.redirect("/shop");
});

router.get("/add-product", (req, res) => {
  res.render("add-product", {
    pageTitle: "Add Product"
  });
});

router.post("/add-product", (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/shop");
});

module.exports = { router, products };
