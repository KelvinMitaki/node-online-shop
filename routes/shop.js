const router = require("express").Router();
const { getShop } = require("../controllers/products");

router.get("/shop", getShop);

module.exports = router;
