const { Movie } = require("../../models");
const User = require("../../models/User");

const getAdminDashboardStats = async (req, res) => {
  try {
    const [movieCount, userCount] = await Promise.all([
      Movie.countDocuments({}),
      User.countDocuments({
        isDeleted: { $ne: true },
      }),
    ]);

    console.log("data ", {
      movieCount,
      userCount,
    });

    res.status(200).json({
      movieCount,
      userCount,
    });
  } catch (err) {
    console.log("error ", err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAdminDashboardStats,
};
