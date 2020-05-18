const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

// PARSING INCOMING REQUESTS
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use(adminRouter);
app.use(shopRouter);

// 404 PAGE
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "../views", "404.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
