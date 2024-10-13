const BASE_PRICE = 5;
const PRICE_PER_KM = 1.5;
const SURGE_MULTIPLIER = 1.5;

exports.calculatePrice = async (distance, vehicleType, bookingTime) => {
  let price = BASE_PRICE + distance * PRICE_PER_KM;

  // Apply vehicle type multiplier
  switch (vehicleType) {
    case "van":
      price *= 1.2;
      break;
    case "truck":
      price *= 1.5;
      break;
  }

  // Check for surge pricing (simplified version)
  const hour = new Date(bookingTime).getHours();
  if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18)) {
    price *= SURGE_MULTIPLIER;
  }

  return Math.round(price * 100) / 100; // Round to 2 decimal places
};
