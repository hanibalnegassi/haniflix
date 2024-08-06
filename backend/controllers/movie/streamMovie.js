const { Movie } = require("../../models");

const streamMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movieData = await Movie.findById(movieId);

    if (!movieData) {
      return res.status(404).send({ message: "Movie not found" });
    }

    // Assuming the video field contains the full S3 URL
    const videoUrl = movieData.video;

    // Check if videoUrl exists
    if (!videoUrl) {
      return res.status(404).send({ message: "Video URL not found" });
    }

    // Redirect the client to the S3 URL
    res.redirect(videoUrl);
  } catch (error) {
    console.error("Error streaming movie:", error);
    res.status(500).send({
      message: "Error streaming movie",
      error,
    });
  }
};

module.exports = streamMovie;
