const products = [];
const getAddProduct = (req, res) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

const postAddProduct = (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/shop");
};
const getShop = (req, res) => {
  console.log(products);

  res.render("shop", {
    products,
    pageTitle: "Shop",
    path: "/shop",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
};

module.exports = { getAddProduct, getShop, postAddProduct };
