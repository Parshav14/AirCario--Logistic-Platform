const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/trackingController");
const auth = require("../middleware/auth");
const driverController = require("../controllers/driverController");

router.get("/jobs", driverController.getDriverJobs);
router.post("/:bookingId/location", auth, trackingController.updateLocation);
router.get("/:bookingId/location", auth, trackingController.getLocation);

module.exports = router;
