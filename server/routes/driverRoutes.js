const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const auth = require("../middleware/auth");

// Get all jobs for a driver
router.get("/jobs", auth, driverController.getDriverJobs);

// Update job status
router.put("/jobs/:jobId/status", auth, driverController.updateJobStatus);

// Update driver location
router.post("/location", auth, driverController.updateDriverLocation);

// Get driver profile
router.get("/profile", auth, driverController.getDriverProfile);

// Update driver profile
router.put("/profile", auth, driverController.updateDriverProfile);

module.exports = router;
