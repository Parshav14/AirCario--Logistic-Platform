import React, { useState, useEffect } from "react";
import { getDriverJobs, updateJobStatus } from "../services/driver";
import { FaUser, FaSignOutAlt, FaCog, FaChevronDown } from "react-icons/fa";

const DriverDashboard = ({ user, handleLogout }) => {
  const [jobs, setJobs] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const driverJobs = await getDriverJobs();
      setJobs(driverJobs);
    } catch (error) {
      console.error("Error fetching driver jobs:", error);
    }
  };

  const handleStatusUpdate = async (jobId, newStatus) => {
    await updateJobStatus(jobId, newStatus);
    fetchJobs();
  };

  const dashboardButtons = [
    { name: "Home", icon: "🏠" },
    { name: "Jobs", icon: "📋" },
    { name: "Earnings", icon: "💰" },
    { name: "Schedule", icon: "🗓️" },
    { name: "Performance", icon: "📊" },
    { name: "Vehicle", icon: "🚗" },
    { name: "Support", icon: "🆘" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Driver Dashboard
          </h2>
        </div>
        <nav className="mt-4">
          {dashboardButtons.map((button) => (
            <a
              key={button.name}
              href="#"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 transition duration-150 ease-in-out"
            >
              <span className="mr-2">{button.icon}</span>
              {button.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome, {user.name}
            </h1>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <FaUser className="mr-2" />
                <span>{user.name}</span>
                <FaChevronDown className="ml-2" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaCog className="inline-block mr-2" /> Settings
                  </a>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="inline-block mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your Jobs
            </h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <li key={job.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-indigo-600 truncate">
                        Job ID: {job.id}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <select
                          value={job.status}
                          onChange={(e) =>
                            handleStatusUpdate(job.id, e.target.value)
                          }
                          className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="Assigned">Assigned</option>
                          <option value="En Route">En Route</option>
                          <option value="Arrived">Arrived</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          From: {job.pickup}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          To: {job.dropoff}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;
