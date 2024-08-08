const { List } = require("../../models");
const { Movie } = require("../../models");

const _ = require("lodash");

const mongoose = require("mongoose");

const getMovies = async (req, res) => {
  try {
    const params = _.pick(req.query, [
      "orderBy",
      "perPage",
      "page",
      "searchTerm",
      "genreId",
      "movieYear",
    ]);
    const {
      orderBy,
      perPage = 20,
      page = 1,
      searchTerm,
      genreId,
      movieYear,
    } = params;

    const skip = (parseInt(page) - 1) * perPage; // Calculate skip for pagination

    let aggregationPipeline = []; // Initialize empty pipeline

    if (searchTerm) {
      aggregationPipeline.push({
        $match: {
          title: {
            $regex: searchTerm, // Match search term in title
            $options: "i", // Case-insensitive search
          },
        },
      });
      aggregationPipeline.push({
        $sort: {
          title: 1,
        },
      });
    }

    // Filter by genre if genreId is provided

    console.log("genreId", genreId)
    if (genreId) {
      aggregationPipeline.push({
        $match: {
          genre: new mongoose.Types.ObjectId(genreId),
        },
      });
      aggregationPipeline.push({
        $sort: {
          title: 1,
        },
      });
    }

    //filter by movie year if present
    if (movieYear) {
      aggregationPipeline.push({
        $match: {
          year: movieYear?.trim(),
        },
      });
      aggregationPipeline.push({
        $sort: {
          title: 1,
        },
      });
    }

    if (orderBy == "failedDuringScrape") {
      aggregationPipeline.push({
        $match: {
          failedDuringScrape: true,
        },
      });
    }

    // Add sort stage based on "orderBy" parameter
    switch (orderBy) {
      case "descAlpha":
        aggregationPipeline.push({ $sort: { title: -1 } });
        break;
      case "ascAlpha":
        aggregationPipeline.push({ $sort: { title: 1 } });
        break;
      case "dateAddedAsc":
        aggregationPipeline.push({ $sort: { createdAt: 1 } }); // Sort by createdAt in ascending order
        break;
      case "dateAddedDesc":
        aggregationPipeline.push({ $sort: { createdAt: -1 } }); // Sort by createdAt in descending order
        break;
    }

    aggregationPipeline = [
      ...aggregationPipeline,
      //
      {
        $lookup: {
          from: "genres",
          localField: "genre",
          foreignField: "_id",
          as: "genre", // Populate full genre objects
        },
      },

      // add likes and dislike counts
      {
        $lookup: {
          from: "movielikes",
          let: { movieId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$movie", "$$movieId"] },
                    { $eq: ["$like", true] },
                  ],
                },
              },
            },
          ],
          as: "likesData",
        },
      },
      {
        $lookup: {
          from: "movielikes",
          let: { movieId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$movie", "$$movieId"] },
                    { $eq: ["$dislike", true] },
                  ],
                },
              },
            },
          ],
          as: "dislikesData",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likesData" },
          dislikesCount: { $size: "$dislikesData" },
        },
      },

      // Calculate total count before limit
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          movies: { $push: "$$ROOT" },
        },
      },

      // Unwind the movies array to restore the original structure
      { $unwind: "$movies" },

      //
      //PAGINATION
      { $skip: skip }, // Apply pagination skip
      { $limit: parseInt(perPage) }, // Apply pagination limit
    ];

    // const movieCount = await Movie.countDocuments({
    //   title: {
    //     $regex: searchTerm || "", // Match search term in title
    //     $options: "i", // Case-insensitive search
    //   },
    // });

    const result = await Movie.aggregate(aggregationPipeline);

    // Extract total count and movies array from the result
    const totalCountWithQuery = result[0] ? result[0].total : 0;
    const movies = result.map((item) => item.movies);

    const currentUser = req.user;

    //
    const defaultList = await List.findOne({
      _id: currentUser.defaultList,
    });

    // Populate the likes and dislikes information for the current user
    movies.forEach((movie) => {
      const userLikes = movie.likesData.filter((like) =>
        like.user.equals(currentUser._id)
      );
      const userDislikes = movie.dislikesData.filter((dislike) =>
        dislike.user.equals(currentUser._id)
      );

      movie.currentUserLiked = userLikes.length > 0;
      movie.currentUserDisliked = userDislikes.length > 0;

      // Check if the movie is in the user's default list
      movie.isInDefaultList = defaultList
        ? defaultList.content.includes(movie._id)
        : false;

      delete movie.likesData;
      delete movie.dislikesData;
    });

    res.status(200).json({ movies, totalMovies: totalCountWithQuery });
  } catch (err) {
    console.log("error ", err);
    res.status(500).json(err);
  }
};

module.exports = getMovies;
