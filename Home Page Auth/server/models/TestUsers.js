const mongoose = require("mongoose");

const TestLoginUserSchema = new mongoose.Schema({
  firebaseUID: { 
    type: String, 
    required: [true, "Firebase UID is required"], 
    unique: true 
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String,
    required: [true, "Password is required"],
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
}, { timestamps: true });

const TestLoginUser = mongoose.model("TestLoginUser", TestLoginUserSchema);
module.exports = TestLoginUser;
