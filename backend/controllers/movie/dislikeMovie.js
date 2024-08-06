const User = require("../../models/User");
const { Movie } = require("../../models");
const MovieLike = require("../../models/MovieLikes");

const dislikeMovie = async (req, res) => {
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
        like: false,
        dislike: true,
      });
      await movieLike.save();
    } else {
      // Toggle the dislike field if it's true, otherwise set dislike to true and like to false
      if (movieLike.dislike) {
        movieLike.dislike = false;
      } else {
        movieLike.like = false;
        movieLike.dislike = true;
      }
      await movieLike.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = dislikeMovie;
