import React, { useState } from "react";
import { estimatePrice } from "../services/pricing";

const FareCalculator = () => {
  const [distance, setDistance] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const price = await estimatePrice({
        distance: parseFloat(distance),
        vehicleType,
      });
      setEstimatedPrice(price);
    } catch (error) {
      console.error("Error estimating price:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6">Fare Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="distance"
          >
            Distance (km)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="distance"
            type="number"
            placeholder="Enter distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleType"
          >
            Vehicle Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Calculate Fare
          </button>
        </div>
      </form>
      {estimatedPrice !== null && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Estimated Fare:</h3>
          <p className="text-2xl font-bold text-green-600">
            ${estimatedPrice.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default FareCalculator;
