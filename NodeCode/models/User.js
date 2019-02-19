const mongoose = require("mongoose");
const Schema = mongoose.schema;
mongoose.Promise = global.Promise;
const md5 = require("md5");
const validator = require("validator");
const mongoDBErrorHandler = require("mongoose-mongodb-errors");
const passwordLocalMongoose = require("password-local-mongoose");

const userSchema = new Schema({});

module.exports(mongoose.model("User", userSchema));
