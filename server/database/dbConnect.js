const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = `mongodb+srv://satishDabhi:Aniish1435@cluster0.djnk3.mongodb.net/ArogyaCareHub?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection Successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

