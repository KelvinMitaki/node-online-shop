const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("5ed650125d58464f18a77ba4");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const PORT = process.env.PORT || 3000;

const MongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CLIENT, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    const user = await User.findOne();
    if (!user) {
      const user = new User({
        name: "kevin mitaki",
        email: "kevinkhalifa911@gmail.com",
        cart: { items: [] }
      });
      await user.save();
    }
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
MongooseConnect();
