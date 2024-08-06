const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    type: { type: String, index: true },
    genre: { type: String },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminList: { type: Boolean, default: false },
    automaticallyAdded: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    ],
  },
  { timestamps: true }
);

module.exports = {
  ListSchema,
};

// module.exports = mongoose.model("List", ListSchema);
