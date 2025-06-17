const patientService = require('../services/patientService');
const db = require('../database/dbConnect');

const getAllPatients = async (req, res) => {
  const allPatients = await patientService.getAllPatients();
  res.send({ status: "OK", data: allPatients });
};

const createNewPatient = async (req, res) => {
  try {
    const { body } = req;
    const savedPatient = await patientService.createNewPatient(body);
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientById = async (req, res) => {
  const {
    params: { patientId },
  } = req;
  if (!patientId) {
    res.send({ message: "id is not valid" });
  }
  const patient = await patientService.getPatientById(patientId);
  res.send({ status: "OK", data: patient });
};

const updatePatientById = async (req, res) => {
  try {
    const { body } = req;
    const updatedPatient = await patientService.updatePatientById(body);
    res.status(201).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewPatient,
  getAllPatients,
  getPatientById,
  updatePatientById
};
