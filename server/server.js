require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const matchingRoutes = require("./routes/matchingRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const driverRoutes = require("./routes/driverRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors({ origin: "https://aircario.vercel.app" }));
app.use(express.json());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api", apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/admin", adminRoutes);

// Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", (bookingId) => {
    socket.join(bookingId);
  });

  socket.on("leaveRoom", (bookingId) => {
    socket.leave(bookingId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server, io }; // Export for testing
