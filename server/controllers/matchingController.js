const { matchDriver } = require("../utils/matchingAlgorithm");
const Booking = require("../models/Booking");

exports.matchDriverForBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const driver = await matchDriver(booking);
    if (!driver) {
      return res.status(404).json({ message: "No available drivers found" });
    }

    booking.driver = driver._id;
    booking.status = "Assigned";
    await booking.save();

    res.json({ message: "Driver matched successfully", driver });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
