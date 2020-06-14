const route = require("express").Router();
const { check } = require("express-validator");

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
route.post(
  "/signup",
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("The password must be at least 6 characters"),
  postSignup
);
route.get("/reset", getReset);
route.post("/reset", postReset);
route.get("/reset/:token", getNewPassword);
route.post("/new-password", postNewPassword);

module.exports = route;
