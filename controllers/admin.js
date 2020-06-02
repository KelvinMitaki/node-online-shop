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
    const product = new Product({
      title,
      imageUrl,
      description,
      price,
      userId: req.user._id
    });
    await product.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect("/");
    }
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);
    if (!product) return res.redirect("/");
    const price = parseInt(product.price);
    product.price = price;
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product
    });
  } catch (error) {
    console.log(error);
  }
};
exports.postEditProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const { title, imageUrl, description, price } = req.body;
    await Product.findByIdAndUpdate(prodId, {
      title,
      imageUrl,
      description,
      price
    });
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    await Product.findByIdAndDelete(prodId);
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  } catch (error) {
    console.log(error);
  }
};
