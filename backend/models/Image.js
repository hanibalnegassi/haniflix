const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    filename: String,
    mimetype: String,
    size: Number,
    environment: String,
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
