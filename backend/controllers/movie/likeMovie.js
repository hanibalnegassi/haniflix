const User = require("../../models/User");
const { Movie } = require("../../models");
const MovieLike = require("../../models/MovieLikes");

const likeMovie = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movie = await Movie.findById(req.params.id);
    let movieLike = await MovieLike.findOne({
      user: user._id,
      movie: movie._id,
    });

    if (!movieLike) {
      // If the user has not expressed any opinion yet, create a new MovieLike document
      movieLike = new MovieLike({
        user: user._id,
        movie: movie._id,
        like: true,
        dislike: false,
      });
      await movieLike.save();
    } else {
      // Toggle the like field if it's true, otherwise set like to true and dislike to false
      if (movieLike.like) {
        movieLike.like = false;
      } else {
        movieLike.like = true;
        movieLike.dislike = false;
      }
      await movieLike.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = likeMovie;
