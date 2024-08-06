const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    ageRating: { type: String },
    duration: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    isSeries: { type: Boolean, default: false, index: true },
    failedDuringScrape: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = {
  MovieSchema,
};

// module.exports = mongoose.model("Movie", MovieSchema);
