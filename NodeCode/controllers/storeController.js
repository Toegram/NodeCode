const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res) => {
  //  FLASH LISTENERS:
  // req.flash("info", "something happened!");
  // req.flash("warning", "something happened!");
  // req.flash("success", "something happened!");
  // req.flash("error", "something happened!");
  res.render("index");
};

exports.addStore = (req, res) => {
  res.render("editStore", { title: "Add Store" });
};

exports.createStore = async (req, res) => {
  //'async' lets compiler know there will be an await
  const store = await new Store(req.body).save();
  // await store.save(); //'await' tells compiler to wait until this is finished before moving on
  req.flash(
    "success",
    `Successfully created ${store.name}! Care to leave a review?`
  );
  res.redirect(`/store/${store.slug}`);
};

// exports.myMiddleware = (req, res, next) => {
//   req.name = "Tony";
//   // res.cookie("name", "Tony Rulez", { maxAge: 1000 });
//   if (req.name === "Tony") {
//     throw Error("Fuck you, Tony");
//   }
//   next();
// };
