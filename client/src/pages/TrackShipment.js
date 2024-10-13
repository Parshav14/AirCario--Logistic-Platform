import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTruck, FaWarehouse, FaCheckCircle } from "react-icons/fa";

const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipmentStatus, setShipmentStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock shipment status
    setShipmentStatus({
      status: "In Transit",
      location: "New York, NY",
      estimatedDelivery: "2023-05-20",
      timeline: [
        { date: "2023-05-15", status: "Order Placed", icon: FaWarehouse },
        { date: "2023-05-16", status: "In Transit", icon: FaTruck },
        { date: "2023-05-20", status: "Delivered", icon: FaCheckCircle },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Track Your Shipment
          </h1>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Enter tracking number"
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              >
                Track
              </button>
            </div>
          </form>
          {shipmentStatus && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Shipment Status
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-lg font-medium text-gray-900">
                      {shipmentStatus.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-medium text-gray-900">
                      {shipmentStatus.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="text-lg font-medium text-gray-900">
                      {shipmentStatus.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Shipment Timeline
              </h3>
              <div className="relative">
                {shipmentStatus.timeline.map((event, index) => (
                  <div key={index} className="mb-8 flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white">
                      <event.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="text-lg font-medium text-gray-900">
                        {event.status}
                      </p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                    {index < shipmentStatus.timeline.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-300 dot-pattern"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackShipment;
