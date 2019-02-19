const mongoose = require("mongoose");
const Schema = mongoose.schema;
mongoose.Promise = global.Promise;
const md5 = require("md5");
const validator = require("validator");
const mongoDBErrorHandler = require("mongoose-mongodb-errors");
const passwordLocalMongoose = require("password-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    vaalidate: [validator.isEmail, "Invalid Email Address"],
    required: "Please Supply An Email Address"
  },
  name: {
    type: String,
    required: "Please Supply A Name",
    trim: true
  }
});

userSchema.plugin(passwordLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongoDBErrorHandler);

module.exports(mongoose.model("User", userSchema));
