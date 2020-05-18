const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/products", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
