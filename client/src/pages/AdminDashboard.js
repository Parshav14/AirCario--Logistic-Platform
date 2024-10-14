import React, { useState, useEffect } from "react";
import DriverList from "../components/DriverList";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import { getDrivers, getBookings } from "../services/admin";
import { FaUser, FaSignOutAlt, FaCog, FaChevronDown } from "react-icons/fa";

const AdminDashboard = ({ user, handleLogout }) => {
  const [drivers, setDrivers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    fetchDrivers();
    fetchBookings();
  }, []);

  const fetchDrivers = async () => {
    try {
      const fetchedDrivers = await getDrivers();
      setDrivers(fetchedDrivers);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const fetchedBookings = await getBookings();
      setBookings(fetchedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const dashboardButtons = [
    { name: "Overview", icon: "📊", tab: "overview" },
    { name: "Drivers", icon: "🚗", tab: "drivers" },
    { name: "Bookings", icon: "📋", tab: "bookings" },
    { name: "Analytics", icon: "📈", tab: "analytics" },
    { name: "User Management", icon: "👥" },
    { name: "Pricing", icon: "💰" },
    { name: "Settings", icon: "⚙️" },
    { name: "Reports", icon: "📝" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Admin Dashboard
          </h2>
        </div>
        <nav className="mt-4">
          {dashboardButtons.map((button) => (
            <a
              key={button.name}
              href="#"
              onClick={() => button.tab && setActiveTab(button.tab)}
              className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 transition duration-150 ease-in-out ${
                activeTab === button.tab ? "bg-gray-200" : ""
              }`}
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
          {activeTab === "overview" && (
            <div className="px-4 py-4 sm:px-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Overview
              </h2>
              {/* Add overview content here */}
            </div>
          )}
          {activeTab === "drivers" && (
            <div className="px-4 py-4 sm:px-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Drivers
              </h2>
              <DriverList drivers={drivers} />
            </div>
          )}
          {activeTab === "bookings" && (
            <div className="px-4 py-4 sm:px-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Bookings
              </h2>
              {/* Add bookings table here */}
            </div>
          )}
          {activeTab === "analytics" && (
            <div className="px-4 py-4 sm:px-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Analytics
              </h2>
              <AnalyticsDashboard />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
