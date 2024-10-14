const User = require("../models/User");
const Booking = require("../models/Booking");

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");
    res.json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({
      status: "Completed",
    });
    const activeDrivers = await User.countDocuments({
      role: "driver",
      status: "Active",
    });

    res.json({
      totalBookings,
      completedBookings,
      activeDrivers,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
};
