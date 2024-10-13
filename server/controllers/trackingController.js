const Booking = require("../models/Booking");
const { io } = require("../server");

exports.updateLocation = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { latitude, longitude } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update location
    booking.currentLocation = { latitude, longitude };
    await booking.save();

    // Emit location update to clients
    io.to(bookingId).emit("locationUpdate", { latitude, longitude });

    res.json({ message: "Location updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getLocation = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking.currentLocation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
