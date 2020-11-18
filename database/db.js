require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  const URI = process.env.MONGODB_URL;
  try {
    await mongoose.connect(URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
