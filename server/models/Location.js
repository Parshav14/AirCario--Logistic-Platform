const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

LocationSchema.index({ coordinates: "2dsphere" });

module.exports = mongoose.model("Location", LocationSchema);
