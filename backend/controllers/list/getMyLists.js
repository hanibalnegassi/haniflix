const { List } = require("../../models");
const User = require("../../models/User");

const getMyLists = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const defaultList = await List.findOne({
      _id: user.defaultList,
      //adminList: false,
    })
    const nonDefaultLists = await List.find({
      user: user._id,
      //adminList: false,
      _id: { $not: { $eq: user.defaultList } },
    })

    res
      .status(200)
      .json([defaultList, ...nonDefaultLists].filter((list) => list != null));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getMyLists;
