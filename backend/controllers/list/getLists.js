const { List } = require("../../models");

const getLists = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;

  const matchQuery = { adminList: true };
  if (typeQuery) matchQuery.type = typeQuery;
  if (genreQuery) matchQuery.genre = genreQuery;

  try {
    const aggregationPipeline = [
      { $match: matchQuery },
      { $unwind: "$content" },
      {
        $lookup: {
          from: "movies", // collection name for Movie documents
          localField: "content",
          foreignField: "_id",
          as: "movieDetails",
        },
      },
      { $unwind: "$movieDetails" },
      { $sort: { "movieDetails.title": 1 } },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          type: { $first: "$type" },
          genre: { $first: "$genre" },
          content: { $push: "$content" },
          user: { $first: "$user" },
          adminList: { $first: "$adminList" },
          automaticallyAdded: { $first: "$automaticallyAdded" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      { $sort: { title: 1 } }, // Sort lists alphabetically by their title
      {
        $project: {
          title: 1,
          type: 1,
          genre: 1,
          content: { $slice: ["$content", 20] },
          user: 1,
          adminList: 1,
          automaticallyAdded: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    const list = await List.aggregate(aggregationPipeline);

    res.status(200).json(list);
  } catch (err) {
    console.error("Error fetching and sorting lists:", err);
    res.status(500).json(err);
  }
};

module.exports = getLists;
