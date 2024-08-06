const ContinueWatchingList = require("../../models/ContinueWatchingList");
const { List } = require("../../models");

const getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate("content");

    res.status(200).json({
      list,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getListById;
