const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricingController");
const auth = require("../middleware/auth");

router.post("/estimate", auth, pricingController.estimatePrice);

module.exports = router;
