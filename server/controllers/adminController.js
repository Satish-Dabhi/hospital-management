const adminService = require('../services/adminService');
const db = require('../database/dbConnect');

const getAllAdmins = async (req, res) => {
  const allAdmins = await adminService.getAllAdmins();
  res.send({ status: "OK", data: allAdmins });
};

const adminLogin = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    if (!email) {
      res.status(401).json({ verified: false, message: 'User Name not found' });
    }
    if (!password) {
      res.status(401).json({ verified: false, message: 'Password not found' });
    }
    const user = await adminService.adminLogin(body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  adminLogin,
  getAllAdmins
};
