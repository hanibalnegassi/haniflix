const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

// module.exports = {
//   GenreSchema,
// };

module.exports = mongoose.model("Genre", GenreSchema);
