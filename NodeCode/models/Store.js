const mongoose = require("mongoose");
mongoose.Promise = global.Promise; //tell mongoose to use 'global' var for async/await

const slug = require("slugs");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a store name" //can be set to true, but this will throw nicer err msg
  },
  slug: String, //defaults to type, obj not necessary here
  description: {
    type: String,
    trim: true //removed white spacing auto-magically
  },
  tags: [String] //Array of strings
});

storeSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    next();
    return;
  }

  this.slug = slug(this.name);
  next();

  //TODO: make sure slugs unique
});

module.exports = mongoose.model("Store", storeSchema);