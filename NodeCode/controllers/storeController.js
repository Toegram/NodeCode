const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render("index");
};

exports.addStore = (req, res) => {
  res.render("editStore", { title: "Add Store" });
};

exports.createStore = async (req, res) => {
  //'async' lets compiler know there will be an await
  const store = new Store(req.body);
  await store.save(); //'await' tells compiler to wait until this is finished before moving on
  res.redirect("/");
};

// exports.myMiddleware = (req, res, next) => {
//   req.name = "Tony";
//   // res.cookie("name", "Tony Rulez", { maxAge: 1000 });
//   if (req.name === "Tony") {
//     throw Error("Fuck you, Tony");
//   }
//   next();
// };
