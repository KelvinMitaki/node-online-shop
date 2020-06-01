const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");
const { MongoConnect } = require("./utils/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("5ed4e8c8d1540296447ff728");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const PORT = process.env.PORT || 3000;
MongoConnect((err, client) => {
  if (err) {
    return console.log(err);
  }

  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
});
