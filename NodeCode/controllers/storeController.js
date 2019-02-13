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

exports.editStore = async (req, res) => {
  //1. find the store base by ID
  const store = await Store.findOne({ _id: req.params.id });
  //2. confirm they are the owner of the store
  //TODO
  //3. render the editform
  res.render("editStore", { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  //1. find the store
  req.body.location.type = "Point";
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, //new:true will return the NEW store instead of the old storeController
    runValidators: true //forces model to RErun init validations
  }).exec();
  req.flash(
    "success",
    `Successfully updated <strong>${store.name}</strong> <a href="/stores/${
      store.slug
    }"> View Store -> </a>`
  );
  res.redirect(`/stores/${store._id}/edit`);
  //redirect to store page
};

//  FLASH LISTENERS:
// req.flash("info", "something happened!");
// req.flash("warning", "something happened!");
// req.flash("success", "something happened!");
// req.flash("error", "something happened!");
