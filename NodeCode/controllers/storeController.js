const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res) => {
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

exports.getStores = async (req, res) => {
  //  queries DB for list of all stores
  const stores = await Store.find();
  res.render("stores", { title: "Stores", stores });
};

//  FLASH LISTENERS:
// req.flash("info", "something happened!");
// req.flash("warning", "something happened!");
// req.flash("success", "something happened!");
// req.flash("error", "something happened!");
