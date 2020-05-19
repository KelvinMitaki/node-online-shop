const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const { router } = require("./routes/admin");
const shopRouter = require("./routes/shop");

const adminRouter = router;

const app = express();

// ADDING A VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "views");

// PARSING INCOMING REQUESTS
app.use(bodyParser.urlencoded({ extended: true }));

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, "../public")));

// ROUTES
app.use(shopRouter);
app.use(adminRouter);

// 404 PAGE
app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Not Found"
  });
});

app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
