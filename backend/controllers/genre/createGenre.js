const Genre = require("../../models/Genre");

const _ = require("lodash");

const createGenre = async (req, res) => {
  const params = _.pick(req.body, ["title"]);

  const newGenre = new Genre({
    title: params.title?.toLowerCase(),
  });
  try {
    const savedGenre = await newGenre.save();
    res.status(201).json(savedGenre);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = createGenre;
