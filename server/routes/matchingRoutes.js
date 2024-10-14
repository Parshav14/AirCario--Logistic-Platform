const express = require("express");
const router = express.Router();
const matchingController = require("../controllers/matchingController");
const auth = require("../middleware/auth");

router.post("/", auth, matchingController.matchDriverForBooking);

module.exports = router;
