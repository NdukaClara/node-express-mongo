const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // connect db
    await mongoose.connect(process.env.DATABASE_URI, {
      // these options prevent warnings from mongodb
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
