const express = require("express");
const patientController = require("../controllers/patientController");
const router = express.Router();

router.get("/all", patientController.getAllPatients);

router.post("/create", patientController.createNewPatient);

router.get("/:patientId", patientController.getPatientById);

router.post("/update", patientController.updatePatientById);

module.exports = router;