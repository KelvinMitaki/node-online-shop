const route = require("express").Router();

const { getLogin, postLogin } = require("../controllers/auth");

route.get("/login", getLogin);
route.post("/login", postLogin);

module.exports = route;
