const mongoose = require("mongoose");
const { Movie } = require("../models");

const Logger = require("../lib/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true
    });
    Logger.info("MongoDB Connected...");

    return;
  } catch (err) {
    if (err) {
      Logger.error("MongoDB error --" + err.message);
      // Exit process with failure
      process.exit(1);
    }
  }
};

module.exports = connectDB;
