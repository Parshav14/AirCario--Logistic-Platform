const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pickup: {
    type: String,
    required: true,
  },
  dropoff: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  bookingTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Assigned", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
  price: {
    type: Number,
    required: true,
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
