const path = require("path");
const { mkdirSync } = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    mkdirSync("./images", { recursive: true });
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`
    );
  }
});

const store = new MongoDBStore({
  uri: process.env.MONGO_CLIENT,
  collection: "sessions"
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({
    storage: fileStorage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: store,
    cookie: {
      maxAge: 60000 * 60
    }
  })
);
app.use(csrf());
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();

  next();
});
app.use(async (req, res, next) => {
  try {
    if (!req.session.user) {
      return next();
    }
    const user = await User.findById(req.session.user._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});
app.use((req, res, next) => {
  if (req.user) {
    res.locals.admin = req.user.admin;
  }
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

const PORT = process.env.PORT || 3000;

const MongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CLIENT, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  } catch (error) {
    console.log(error);
  }
};
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
MongooseConnect();
