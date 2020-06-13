const route = require("express").Router();

const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword
} = require("../controllers/auth");

route.get("/login", getLogin);
route.post("/login", postLogin);
route.post("/logout", postLogout);
route.get("/signup", getSignup);
route.post("/signup", postSignup);
route.get("/reset", getReset);
route.post("/reset", postReset);
route.get("/reset/:token", getNewPassword);
route.post("/new-password", postNewPassword);

module.exports = route;
