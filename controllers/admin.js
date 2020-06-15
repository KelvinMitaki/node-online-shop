const Product = require("../models/product");
const { validationResult } = require("express-validator");
const fs = require("fs");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: ""
  });
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req);
    if (!image) {
      return res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
        isAuthenticated: req.session.isLoggedIn,
        errorMessage: "Attached file is not an image",
        product: { title, price, description }
      });
    }

    if (!errors.isEmpty()) {
      return res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
        isAuthenticated: req.session.isLoggedIn,
        errorMessage: errors.array()[0].msg,
        product: { title, price, description }
      });
    }
    const imageUrl = image.path;
    const product = new Product({
      title,
      imageUrl,
      description,
      price,
      userId: req.session.user._id
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
      product,
      isAuthenticated: req.session.isLoggedIn,
      errorMessage: ""
    });
  } catch (error) {
    console.log(error);
  }
};
exports.postEditProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const { title, description, price } = req.body;
    const image = req.file;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
        isAuthenticated: req.session.isLoggedIn,
        errorMessage: errors.array()[0].msg,
        editing: true,
        product: { title, price, description }
      });
    }
    if (image) {
      const prod = await Product.findOne({ _id: prodId });
      fs.unlink(prod.imageUrl, err => err && err);
      const imageUrl = image.path;
      await Product.findByIdAndUpdate(prodId, {
        title,
        imageUrl,
        description,
        price
      });
    }
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const prod = await Product.findByIdAndDelete(prodId);
    fs.unlink(prod.imageUrl, err => err && err);
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
      path: "/admin/products",
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (error) {
    console.log(error);
  }
};
