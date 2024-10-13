import React, { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";
import FareCalculator from "../components/FareCalculator";
import RealTimeTracker from "../components/RealTimeTracker";
import { createBooking, getBookings } from "../services/booking";
import { FaUser, FaSignOutAlt, FaCog, FaChevronDown } from "react-icons/fa";

const CustomerDashboard = ({ user, handleLogout }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("bookRide");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const fetchedBookings = await getBookings();
      setBookings(fetchedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      await createBooking(bookingData);
      fetchBookings();
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const dashboardButtons = [
    { name: "Book a Ride", icon: "🚗", tab: "bookRide" },
    { name: "My Bookings", icon: "📋", tab: "myBookings" },
    { name: "Fare Calculator", icon: "🧮", tab: "fareCalculator" },
    { name: "Payment Methods", icon: "💳", tab: "paymentMethods" },
    { name: "Promotions", icon: "🎉", tab: "promotions" },
    { name: "Support", icon: "🆘", tab: "support" },
    { name: "Settings", icon: "⚙️", tab: "settings" },
    { name: "Refer a Friend", icon: "👥", tab: "referFriend" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Customer Dashboard
          </h2>
        </div>
        <nav className="mt-4">
          {dashboardButtons.map((button) => (
            <a
              key={button.name}
              href="#"
              onClick={() => setActiveTab(button.tab)}
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
          {activeTab === "bookRide" && (
            <div className="px-4 py-4 sm:px-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Book a Ride
              </h2>
              <BookingForm onSubmit={handleBookingSubmit} />
            </div>
          )}
          {activeTab === "myBookings" && (
            <div className="px-4 py-4 sm:px-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Your Bookings
              </h2>
              <ul className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <li key={booking.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          From: {booking.pickup} To: {booking.dropoff}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          Status: {booking.status}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Track
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {selectedBooking && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Real-Time Tracking
                  </h3>
                  <RealTimeTracker bookingId={selectedBooking.id} />
                </div>
              )}
            </div>
          )}
          {activeTab === "fareCalculator" && (
            <div className="px-4 py-4 sm:px-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Fare Calculator
              </h2>
              <FareCalculator />
            </div>
          )}
          {/* Add more tab content here */}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
