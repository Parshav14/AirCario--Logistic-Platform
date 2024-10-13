const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const auth = require("../middleware/auth");

// Create a new booking
router.post("/", auth, bookingController.createBooking);

// Get all bookings for a user
router.get("/", auth, bookingController.getBookings);

// Update booking status
router.put("/:id/status", auth, bookingController.updateBookingStatus);

module.exports = router;
