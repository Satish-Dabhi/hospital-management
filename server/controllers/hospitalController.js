const hospitalService = require('../services/hospitalService');
const db = require('../database/dbConnect');

const getAllHospitals = async (req, res) => {
  const allHospitals = await hospitalService.getAllHospitals();
  res.send({ status: "OK", data: allHospitals });
};

const hospitalSignUp = async (req, res) => {
  try {
    const { body } = req;
    const response = await hospitalService.hospitalSignUp(body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hospitalSignIn = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    if (!email) {
      res.status(401).json({ verified: false, message: 'User Name not found' });
    }
    if (!password) {
      res.status(401).json({ verified: false, message: 'Password not found' });
    }
    const response = await hospitalService.hospitalSignIn(body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { body } = req;
    const updatedHospital = await hospitalService.verifyOtp(body);
    if (updatedHospital) {
      res.status(201).json({ verified: true, message: 'OTP verified successfully', token: updatedHospital?.token, user: updatedHospital?.user });
    } else {
      res.status(200).json({ verified: false, message: 'OTP is not valid' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  hospitalSignUp,
  hospitalSignIn,
  getAllHospitals,
  verifyOtp
};
