const ContinueWatchingList = require("../../models/ContinueWatchingList");
const User = require("../../models/User");

const getContinueWatchingList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const continueWatchingList = await ContinueWatchingList.findOne({
      user: user._id,
    });

    res.status(200).json({
      list: continueWatchingList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getContinueWatchingList;
