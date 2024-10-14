const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["car", "van", "truck"],
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "maintenance", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
