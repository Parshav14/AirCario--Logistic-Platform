const { Worker } = require("bullmq");
const Redis = require("ioredis");
const User = require("../models/User");
const Location = require("../models/Location");

const connection = new Redis(process.env.REDIS_URL);

const processDriverUpdate = async (job) => {
  const { driverId, latitude, longitude } = job.data;

  try {
    const driver = await User.findById(driverId);
    if (!driver) {
      throw new Error("Driver not found");
    }

    const location = new Location({
      user: driverId,
      coordinates: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    await location.save();

    // Emit location update to relevant clients (implementation depends on your real-time setup)
    // For example, using Socket.io:
    // io.to(`driver:${driverId}`).emit('locationUpdate', { latitude, longitude });

    console.log(`Updated location for driver ${driverId}`);
  } catch (error) {
    console.error("Error processing driver update:", error);
  }
};

const worker = new Worker("driverUpdates", processDriverUpdate, { connection });

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error ${err.message}`);
});

module.exports = worker;
