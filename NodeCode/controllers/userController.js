const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require("es6-promisify");

exports.loginForm = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.registerForm = (req, res) => {
  res.render("register", { title: "Sign Up" });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("name");
  req.checkBody("name", "Please supply a Name").notEmpty();
  req.checkBody("email", "Please supply a valid Email").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody("password", "Please suppy a valid Password");
  req
    .checkBody("confirm-password", "Your passwords do not match")
    .notEmpty()
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash("errors", errors.map(err => err.msg));
    res.render("register", {
      title: "Sign Up",
      body: req.body,
      flashes: req.flash()
    });
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name
  });
  const register = promisify(User.register, User); // if passing a method that lives on an object, promisift ALSO needs the original object to bind it to
  await register(user, req.body.password);
  next();
};
