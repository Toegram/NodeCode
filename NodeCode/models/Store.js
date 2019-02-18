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
  tags: [String], //Array of strings
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [
      {
        type: Number,
        required: "You must supply coordinates"
      }
    ],
    address: {
      type: String,
      required: "You must supply an address"
    }
  },
  photo: String
});

storeSchema.pre("save", async function(next) {
  //before something is saved, do this
  if (!this.isModified("name")) {
    //CAN NOT use arrow function because of 'this'
    next(); //skip it
    return; //stops function from running if name is NOT changed
  }

  this.slug = slug(this.name);

  //Regex find any slug that starts with this.slug and optionally ends with - 0-9
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");

  const storesWithSlug = await this.constructor.find({ slug: slugRegex });
  next();

  //Sets slug to slug + - + incrementing number
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }

  //TODO: make sure slugs unique
});

storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

module.exports = mongoose.model("Store", storeSchema);
