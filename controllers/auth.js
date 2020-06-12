const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: req.flash("error")
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "invalid email");
      return res.redirect("/login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "invalid password");
      return res.redirect("/login");
    }
    req.session.user = user;
    req.session.isLoggedIn = true;
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false
  });
};

exports.postSignup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const { confirmPaswword } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.redirect("/login");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      cart: { items: [] }
    });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};
