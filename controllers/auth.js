const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false
  });
};

exports.postLogin = async (req, res, next) => {
  const user = await User.findById("5ed650125d58464f18a77ba4");
  req.session.user = user;
  req.session.isLoggedIn = true;
  res.redirect("/");
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
};
