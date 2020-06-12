const route = require("express").Router();

const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset
} = require("../controllers/auth");

route.get("/login", getLogin);
route.post("/login", postLogin);
route.post("/logout", postLogout);
route.get("/signup", getSignup);
route.post("/signup", postSignup);
route.get("/reset", getReset);

module.exports = route;
