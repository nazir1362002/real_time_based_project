const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "resolved", "rejected"],
      default: "pending",
    },
    location: {
      lat: Number,
      lng: Number,
    },

  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Emergency", emergencySchema);
