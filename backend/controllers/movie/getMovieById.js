const { Movie } = require("../../models");
const { List } = require("../../models");
const MovieLike = require("../../models/MovieLikes");

const getMovieById = async (req, res) => {
  //router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(400).send({
        message: "Movie not found",
      });
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
      ...movie.toObject(),
      likesCount,
      dislikesCount,
      currentUserLiked,
      currentUserDisliked,
      isInDefaultList,
    };

    res.status(200).json(responseMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = getMovieById;
