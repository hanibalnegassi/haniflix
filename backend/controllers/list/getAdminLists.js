const { List } = require("../../models");

const _ = require("lodash");

const getAdminLists = async (req, res) => {
  try {
    const params = _.pick(req.query, ["orderBy"]);
    const orderBy = params.orderBy;

    const aggregationPipeline = []; // Initialize empty pipeline

    // match stage
    aggregationPipeline.push({ $match: { adminList: true } });

    // Add sort stage based on "orderBy" parameter
    switch (orderBy) {
      case "descAlpha":
        aggregationPipeline.push({ $sort: { title: -1 } });
        break;
      case "ascAlpha":
        aggregationPipeline.push({ $sort: { title: 1 } });
        break;
      default:
        aggregationPipeline.push({ $sort: { _id: 1 } });
        break;
    }

    const list = await List.aggregate(aggregationPipeline);

    res.status(200).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAdminLists;
