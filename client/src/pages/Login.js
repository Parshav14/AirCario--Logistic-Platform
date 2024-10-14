import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../services/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUser, FaTruck, FaUserShield } from "react-icons/fa";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("parshav769@gmail.com");
  const [password, setPassword] = useState("Hifrosty");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    document.body.style.backgroundImage = "url('/images/background.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    return () => {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundAttachment = "initial";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!role) {
      setError("Please select a role");
      return;
    }
    try {
      const userData = await login(email, password, role);
      if (userData && userData.role) {
        setUser(userData);
        toast.success("Logged in successfully!");
        switch (userData.role) {
          case "admin":
            history.push("/admin-dashboard");
            break;
          case "customer":
            history.push("/customer-dashboard");
            break;
          case "driver":
            history.push("/driver-dashboard");
            break;
          default:
            setError("Invalid user role");
        }
      } else {
        setError("Invalid user data received");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const roleIcons = {
    customer: FaUser,
    driver: FaTruck,
    admin: FaUserShield,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md"
        whileHover={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)" }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center mb-8"
        >
          <img
            src="/images/logo.png"
            alt="AirCario Logo"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-4xl font-extrabold text-gray-800">AirCario</h1>
        </motion.div>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 tracking-wider">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
              required
            />
          </motion.div>

          <div className="flex justify-between space-x-4">
            {["customer", "driver", "admin"].map((r) => {
              const Icon = roleIcons[r];
              return (
                <motion.button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#4338ca",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition duration-150 ease-in-out flex items-center justify-center ${
                    role === r
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-indigo-600 border border-indigo-600"
                  }`}
                >
                  <Icon className="mr-2" />
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </motion.button>
              );
            })}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: "#6366f1" }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white rounded-lg py-3 px-6 text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-xl transition duration-150 ease-in-out"
          >
            Sign In
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out font-medium"
          >
            Sign up
          </Link>
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-50 p-4 mt-6 rounded-lg shadow-lg"
        >
          <Link
            to="/track-shipment"
            className="text-indigo-600 hover:text-indigo-800 font-medium text-center block"
          >
            Track Your Shipment
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
