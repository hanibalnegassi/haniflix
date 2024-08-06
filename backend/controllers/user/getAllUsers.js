const User = require("../../models/User");
const _ = require("lodash");

const getAllusers = async (req, res) => {
  // const query = req.query.new;
  //if(req.user.isAdmin) {
  try {
    const params = _.pick(req.query, ["orderBy"]);
    const orderBy = params.orderBy;

    const aggregationPipeline = []; // Initialize empty pipeline

    // Add sort stage based on "orderBy" parameter
    switch (orderBy) {
      case "descAlpha":
        aggregationPipeline.push({ $sort: { fullname: -1 } });
        break;
      case "ascAlpha":
        aggregationPipeline.push({ $sort: { fullname: 1 } });
        break;
    }

    // Ensure at least one pipeline stage
    if (aggregationPipeline.length === 0) {
      aggregationPipeline.push({ $match: {} });
    }

    aggregationPipeline.push({
      $match: {
        isDeleted: { $ne: true },
      },
    });

    aggregationPipeline.push({
      $project: {
        _id: 1,
        // Exclude accessToken
        accessToken: 0,
      },
    });

    const users = await User.aggregate(aggregationPipeline);

    res.status(200).json(users);
  } catch (err) {
    //-- throws a 'headers_already_sent' error
    console.log("erro ", err);

    res.status(500).json(err);
  }
  /*} else {
        res.status(403).json("You are not allowed to see all users!");
    }*/
};

module.exports = getAllusers;
