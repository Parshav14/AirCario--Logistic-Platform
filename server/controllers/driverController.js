const Booking = require("../models/Booking");
const User = require("../models/User");

exports.getDriverJobs = async (req, res) => {
  try {
    const jobs = await Booking.find({
      driver: req.user.id,
      status: { $ne: "Completed" },
    }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching driver jobs:", error);
    res.status(500).json({ message: "Error fetching driver jobs" });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { _id: jobId, driver: req.user.id },
      { status },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or not assigned to this driver" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: "Error updating job status" });
  }
};

exports.updateDriverLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const driver = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { "location.coordinates": [longitude, latitude] } },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json({ message: "Location updated successfully" });
  } catch (error) {
    console.error("Error updating driver location:", error);
    res.status(500).json({ message: "Error updating driver location" });
  }
};

exports.getDriverProfile = async (req, res) => {
  try {
    const driver = await User.findById(req.user.id).select("-password");
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    console.error("Error fetching driver profile:", error);
    res.status(500).json({ message: "Error fetching driver profile" });
  }
};

exports.updateDriverProfile = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    const driver = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name, email, phoneNumber } },
      { new: true }
    ).select("-password");

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(driver);
  } catch (error) {
    console.error("Error updating driver profile:", error);
    res.status(500).json({ message: "Error updating driver profile" });
  }
};
