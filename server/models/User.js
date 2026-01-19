const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "responder"],
    default: "responder",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/*import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "responder"],
    default: "responder",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);*/

module.exports = mongoose.model("User", userSchema);
