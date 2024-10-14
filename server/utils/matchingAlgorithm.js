const User = require("../models/User");

exports.matchDriver = async (booking) => {
  try {
    // In a real scenario, you'd use more sophisticated geospatial queries
    // and consider factors like driver ratings, current location, etc.
    const driver = await User.findOne({
      role: "driver",
      // Add more filtering criteria here
    }).sort({ createdAt: -1 }); // Just an example, not the best way to match

    return driver;
  } catch (err) {
    console.error("Error in matchDriver:", err);
    return null;
  }
};
