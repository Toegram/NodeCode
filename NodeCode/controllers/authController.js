const passport = require("passport");

exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed To Login",
  successRedirect: "/",
  successFlash: "Logged In!"
});
