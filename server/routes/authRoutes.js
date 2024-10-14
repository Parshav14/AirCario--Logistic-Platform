const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../middleware/validation");

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login);
router.post("/create-admin", authController.createAdmin);

module.exports = router;
