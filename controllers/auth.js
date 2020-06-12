const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodeMailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID
    }
  })
);

exports.getLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/");
  }
  let showError = req.flash("error");
  if (showError.length > 0) {
    showError = showError[0];
  } else {
    showError = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: showError
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "invalid email");
      return res.redirect("/login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "invalid password");
      return res.redirect("/login");
    }

    req.session.user = user;
    req.session.isLoggedIn = true;
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
exports.getSignup = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/");
  }
  let showError = req.flash("error");
  if (showError.length > 0) {
    showError = showError[0];
  } else {
    showError = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: showError
  });
};

exports.getReset = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/");
  }
  let showError = req.flash("error");
  if (showError.length > 0) {
    showError = showError[0];
  } else {
    showError = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: showError
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    try {
      if (err) {
        console.log(err);
        return res.redirect("/reset");
      }
      const token = buffer.toString("hex");
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        req.flash("error", "No user with that email");
        return res.redirect("/reset");
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();
      transporter.sendMail(
        {
          to: req.body.email,
          from: "kevinkhalifa911@gmail.com",
          subject: "Password Reset",
          html: `<h1>You requested a password reset</h1>
          <p>click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password </p>`
        },
        (err, info) => {
          if (err) console.log(err);
          console.log(info);
        }
      );
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  });
};

exports.postSignup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const { confirmPaswword } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      req.flash("error", "email already exists");
      return res.redirect("/signup");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      cart: { items: [] }
    });
    await user.save();

    res.redirect("/login");
    transporter.sendMail(
      {
        to: email,
        from: "kevinkhalifa911@gmail.com",
        subject: "Sign up succeed",
        html: "<h1>You have successfully signed up</h1>"
      },
      (err, info) => {
        if (err) console.log(err);
        console.log(info);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
