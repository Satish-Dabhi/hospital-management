const express = require('express');
const { json } = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patient');
const adminRoutes = require('./routes/admin');
const hospitalRoutes = require('./routes/hospital');
require("dotenv").config();

const app = express();
app.use(json());
app.use(cors());
const { auth, verifyToken } = require('./middleware/auth');

const PORT = process.env.PORT || 3007;

app.get('/', (req, res) => {
  res.send('Working ...:)');
});

app.use('/patient', auth, patientRoutes);
app.use('/admin', adminRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/verify-token', verifyToken);

app.listen(PORT, () => { console.log(`Server running on ${PORT}`); });
