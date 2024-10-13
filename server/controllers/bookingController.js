const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { pickup, dropoff, vehicleType, bookingTime } = req.body;
    const newBooking = new Booking({
      user: req.user.id,
      pickup,
      dropoff,
      vehicleType,
      bookingTime,
    });
    const savedBooking = await newBooking.save();
    res.json(savedBooking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let booking = await Booking.findById(id);

    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
