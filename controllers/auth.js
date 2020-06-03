const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);

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
