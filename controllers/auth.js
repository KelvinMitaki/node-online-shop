exports.getLogin = (req, res, next) => {
  console.log(req.get("Cookie"));
  const isLoggedIn = req.get("Cookie").trim().split("=")[1];

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
