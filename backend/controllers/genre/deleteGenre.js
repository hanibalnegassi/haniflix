const Genre = require("../../models/Genre");

const deleteGenre = async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "The genre has been deleted...",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = deleteGenre;
