const router = require("express").Router();
const { products } = require("./admin");

router.get("/shop", (req, res) => {
  console.log(products);

  res.render("shop", {
    products,
    pageTitle: "Shop",
    path: "/shop",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;
