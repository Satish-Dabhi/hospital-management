const express = require("express");
const hospitalController = require("../controllers/hospitalController");
const router = express.Router();

router.get("/", hospitalController.getAllHospitals);

router.post("/sign-in", hospitalController.hospitalSignIn);

router.post("/sign-up", hospitalController.hospitalSignUp);

router.post("/verify-otp", hospitalController.verifyOtp);

module.exports = router;