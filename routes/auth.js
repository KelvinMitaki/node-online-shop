const route = require("express").Router();

const { getLogin } = require("../controllers/auth");

route.get("/login", getLogin);

module.exports = route;
