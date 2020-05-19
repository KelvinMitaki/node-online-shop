const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.redirect("/shop");
});

router.get("/add-product", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views", "add-product.html"));
});

router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/shop");
});

module.exports = router;
