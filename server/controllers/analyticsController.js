const Booking = require("../models/Booking");

exports.getAnalytics = async (req, res) => {
  try {
    const totalTrips = await Booking.countDocuments({ status: "Completed" });

    const avgTripTime = await Booking.aggregate([
      { $match: { status: "Completed" } },
      {
        $group: {
          _id: null,
          avgTime: { $avg: { $subtract: ["$completedAt", "$createdAt"] } },
        },
      },
    ]);

    const tripsPerDay = await Booking.aggregate([
      { $match: { status: "Completed" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          trips: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalTrips,
      avgTripTime: avgTripTime[0]
        ? Math.round(avgTripTime[0].avgTime / 60000)
        : 0, // Convert to minutes
      tripsPerDay: tripsPerDay.map((day) => ({
        date: day._id,
        trips: day.trips,
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
