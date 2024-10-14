import React, { useState } from "react";

const BookingForm = ({ onSubmit }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ pickup, dropoff, vehicleType, bookingTime });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="pickup"
          className="block text-sm font-medium text-gray-700"
        >
          Pickup Location
        </label>
        <input
          type="text"
          id="pickup"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="dropoff"
          className="block text-sm font-medium text-gray-700"
        >
          Dropoff Location
        </label>
        <input
          type="text"
          id="dropoff"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="vehicleType"
          className="block text-sm font-medium text-gray-700"
        >
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a vehicle type</option>
          <option value="car">Car</option>
          <option value="van">Van</option>
          <option value="truck">Truck</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="bookingTime"
          className="block text-sm font-medium text-gray-700"
        >
          Booking Time
        </label>
        <input
          type="datetime-local"
          id="bookingTime"
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Book Now
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
