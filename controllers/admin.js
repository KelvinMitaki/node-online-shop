const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({ title, imageUrl, description, price });
    await product.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findById(prodId, product => {
    if (!product) return res.redirect("/");
    const price = parseInt(product.price);
    product.price = price;

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product
    });
  });
};
exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const { title, imageUrl, description, price } = req.body;
  await Product.findByIdAndUpdate(prodId, {
    title,
    imageUrl,
    description,
    price
  });
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId);
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};
