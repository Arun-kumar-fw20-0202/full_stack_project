const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    is_married: Boolean,
    city: String,
    language: String,
    phone: String,
    avatar: String,
    gender: String,
    gmail: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
