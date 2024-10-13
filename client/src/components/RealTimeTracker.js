import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const RealTimeTracker = ({ bookingId }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL);

    socket.emit("joinRoom", bookingId);

    socket.on("locationUpdate", (data) => {
      setLocation(data);
    });

    return () => {
      socket.emit("leaveRoom", bookingId);
      socket.disconnect();
    };
  }, [bookingId]);

  if (!location) {
    return <div>Waiting for driver location...</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Real-Time Tracking
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Latitude</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {location.latitude}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Longitude</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {location.longitude}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default RealTimeTracker;
