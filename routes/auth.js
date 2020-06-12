const route = require("express").Router();

const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset
} = require("../controllers/auth");

route.get("/login", getLogin);
route.post("/login", postLogin);
route.post("/logout", postLogout);
route.get("/signup", getSignup);
route.post("/signup", postSignup);
route.get("/reset", getReset);
route.post("/reset", postReset);

module.exports = route;
