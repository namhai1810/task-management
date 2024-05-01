const mongoose = require("mongoose");
const generateHelper = require("../../../helpers/generate");
const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: generateHelper.generateRandomString(20),
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema, "user");

module.exports = User;
