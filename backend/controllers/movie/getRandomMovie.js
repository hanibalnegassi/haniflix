const { Movie } = require("../../models");
const MovieLike = require("../../models/MovieLikes");
const { List } = require("../../models");

const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;

  const matchCondition = {
    $match: {
      $expr: {
        $and: [
          { $ne: ["$video", null] },
          { $ne: ["$video", ""] },
          { $ne: ["$img", null] },
          { $ne: ["$img", ""] },
          { $ifNull: ["$video", false] },
          { $ifNull: ["$img", false] },
        ],
      },
    },
  };

  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        //movie must be playable and have an image
        matchCondition,
        { $sample: { size: 1 } },
      ]);
    } else if (type === "movies") {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        //movie must be playable and have an image
        matchCondition,
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        //movie must be playable and have an image
        matchCondition,
        { $sample: { size: 1 } },
      ]);
    }

    movie = movie?.[0];

    //if movie is not found, then select anyone
    if (!movie) {
      movie = await Movie.aggregate([
        //movie must be playable and have an image
        matchCondition,
        { $sample: { size: 1 } },
      ]);
    }

    // Count likes and dislikes using aggregation
    const [likesData, dislikesData, likesCount, dislikesCount] =
      await Promise.all([
        MovieLike.find({ movie: movie._id, like: true }),
        MovieLike.find({ movie: movie._id, dislike: true }),
        MovieLike.countDocuments({ movie: movie._id, like: true }),
        MovieLike.countDocuments({ movie: movie._id, dislike: true }),
      ]);

    const currentUser = req.user;

    const userLikes = likesData.filter((like) =>
      like.user.equals(currentUser._id)
    );
    const userDislikes = dislikesData.filter((dislike) =>
      dislike.user.equals(currentUser._id)
    );

    const currentUserLiked = userLikes.length > 0;
    const currentUserDisliked = userDislikes.length > 0;

    // Check if the movie is in the user's default list
    const defaultList = await List.findOne({
      _id: currentUser.defaultList,
    });

    const isInDefaultList = defaultList
      ? defaultList.content.includes(movie._id)
      : false;

    // Add likesCount and dislikesCount to the movie object
    const responseMovie = {
      ...movie,
      likesCount,
      dislikesCount,
      currentUserLiked,
      currentUserDisliked,
      isInDefaultList,
    };

    res.status(200).json(responseMovie);
  } catch (err) {
    console.log("500 ", err);
    res.status(500).json(err);
  }
};

module.exports = getRandomMovie;
