const mongoose = require("mongoose");

const TestLoginUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    number: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    photoURL: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    googleVerified: {
      type: Boolean,
      default: false,
    },
    facebookVerified: {
      type: Boolean,
      default: false,
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TestLoginUser = mongoose.model("TestLoginUser", TestLoginUserSchema);
module.exports = TestLoginUser;
