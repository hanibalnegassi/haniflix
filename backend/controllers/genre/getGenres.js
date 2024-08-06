const Genre = require("../../models/Genre");

const _ = require("lodash");

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find({}).sort({ title: 1 });
    res.status(200).json({ genres });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = getGenres;
