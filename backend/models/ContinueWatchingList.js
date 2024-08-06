const mongoose = require("mongoose");

const ContinueWatchingListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensure only one list per user
    },
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
      },
    ],
    watchedPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // Constrain to valid percentage values
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    resumeTimestamp: {
      type: Date,
      // Optional field for tracking resumed movies
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ContinueWatchingList",
  ContinueWatchingListSchema
);
