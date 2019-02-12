const mongoose = require("mongoose");
mongoose.Promise = global.Promise; //tell mongoose to use 'global' var for async/await

const slug = require("slugs");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, //try to do all data normalization as close to the model as possible
    required: "Please enter a store name" //can be set to true, but this will throw nicer err msg
  },
  slug: String, //defaults to type, obj not necessary here
  description: {
    type: String,
    trim: true //removed white spacing auto-magically
  },
  tags: [String] //Array of strings
});

storeSchema.pre("save", function(next) { //before something is saved, do this
  if (!this.isModified("name")) { //CAN NOT use arrow function because of 'this'
    next(); //skip it
    return; //stops function from running if name is NOT changed
  }

  this.slug = slug(this.name);
  next();

  //TODO: make sure slugs unique
});

module.exports = mongoose.model("Store", storeSchema);
