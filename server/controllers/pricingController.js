const { calculatePrice } = require("../utils/pricingModel");

exports.estimatePrice = async (req, res) => {
  try {
    const { distance, vehicleType, bookingTime } = req.body;

    const price = await calculatePrice(distance, vehicleType, bookingTime);

    res.json({ price });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
