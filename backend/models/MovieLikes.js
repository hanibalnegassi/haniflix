const mongoose = require("mongoose");

const MovieLikeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    like: {
      type: Boolean,
      required: true,
    },
    dislike: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

MovieLikeSchema.index({ movie: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("MovieLike", MovieLikeSchema);
