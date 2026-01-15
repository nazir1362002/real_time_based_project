const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Emergency", emergencySchema);
