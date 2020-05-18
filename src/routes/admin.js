const router = require("express").Router();

// router.get("/products",(req,res)=>{})

router.post("/products", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
