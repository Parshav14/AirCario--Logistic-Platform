import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {role === "admin" && (
            <>
              <li className="mb-2">
                <Link
                  to="/admin-dashboard"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/admin-dashboard/drivers"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Manage Drivers
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/admin-dashboard/analytics"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Analytics
                </Link>
              </li>
            </>
          )}
          {role === "customer" && (
            <>
              <li className="mb-2">
                <Link
                  to="/customer-dashboard"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/customer-dashboard/book"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Book a Ride
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/customer-dashboard/bookings"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  My Bookings
                </Link>
              </li>
            </>
          )}
          {role === "driver" && (
            <>
              <li className="mb-2">
                <Link
                  to="/driver-dashboard"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/driver-dashboard/jobs"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Available Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/driver-dashboard/history"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Job History
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
