const path = require("path");
const router = require("express").Router();

router.get("/shop", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views", "shop.html"));
});

module.exports = router;
