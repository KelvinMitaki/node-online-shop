const route = require("express").Router();

const { getLogin, postLogin, postLogout } = require("../controllers/auth");

route.get("/login", getLogin);
route.post("/login", postLogin);
route.post("/logout", postLogout);

module.exports = route;
